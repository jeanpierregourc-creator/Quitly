/**
 * QUITLY — Firmware Prototype v0.1
 * ===================================
 * Hardware : Adafruit Feather nRF52840 Express
 * Capteur  : MPXV7002DP (débit d'air, sortie analogique sur A0)
 * Verrou   : MOSFET IRLB8721 sur PIN D5 (coupe le courant vers l'atomiseur)
 * LEDs     : Rouge D6 (verrouillé) / Verte D7 (actif)
 * BLE      : Service GATT custom — données envoyées en batch à l'app
 *
 * PHASES :
 *   Phase 1 (OBSERVATION) : pas de limite, collecte toutes les bouffées
 *   Phase 3 (PROGRAMME)   : budget journalier, verrou si dépassement
 *
 * INSTALL :
 *   Arduino IDE → Préférences → URL supplémentaires :
 *   https://adafruit.github.io/arduino-board-index/package_adafruit_index.json
 *   Gestionnaire de cartes → "Adafruit nRF52" → Installer
 *   Bibliothèque : rien de supplémentaire (bluefruit.h inclus dans le BSP)
 */

#include <bluefruit.h>

// ─────────────────────────────────────────────────────────────
// PINS
// ─────────────────────────────────────────────────────────────
#define PIN_AIRFLOW    A0   // Sortie analogique MPXV7002DP
#define PIN_MOSFET     5    // Gate du IRLB8721 (verrou)
#define PIN_LED_RED    6    // LED rouge = verrouillé
#define PIN_LED_GREEN  7    // LED verte = actif / prêt

// ─────────────────────────────────────────────────────────────
// DÉTECTION DE BOUFFÉE
// ─────────────────────────────────────────────────────────────
// Le MPXV7002DP : au repos, Vout ≈ Vcc/2 (ADC ≈ 512 sur 10 bits)
// Quand l'utilisateur aspire → pression négative → Vout descend
// Seuil à calibrer selon ton montage (commence à 450, ajuste)
#define PUFF_THRESHOLD_ADC    450    // En dessous = bouffée détectée
#define PUFF_MIN_DURATION_MS  150    // Ignore les faux positifs <150ms
#define PUFF_MAX_DURATION_MS  8000   // Sécurité : coupe après 8 secondes
#define SAMPLE_RATE_MS        10     // Lecture capteur toutes les 10ms (100Hz)

// ─────────────────────────────────────────────────────────────
// STRUCTURE D'UNE BOUFFÉE
// ─────────────────────────────────────────────────────────────
struct PuffRecord {
  uint32_t timestamp_s;    // Secondes depuis allumage (ou epoch si RTC)
  uint16_t duration_ms;    // Durée en millisecondes
  uint8_t  avg_flow;       // Valeur ADC moyenne (proxy du débit)
};                         // = 7 octets par bouffée

// Stockage RAM : 500 bouffées max avant sync (500 × 7 = 3.5 KB)
// À 200 bouffées/jour → 2,5 jours sans sync
// (on passera à la Flash interne pour plus de capacité en v1.1)
#define MAX_PUFF_HISTORY 500
PuffRecord puffHistory[MAX_PUFF_HISTORY];
uint16_t   puffCount = 0;       // Total depuis allumage
uint16_t   dailyPuffCount = 0;  // Compteur journalier (reset à minuit)

// ─────────────────────────────────────────────────────────────
// PROGRAMME (mis à jour via BLE depuis l'app)
// ─────────────────────────────────────────────────────────────
uint16_t dailyBudget     = 9999;   // Phase 1 : pas de limite
bool     isObservation   = true;   // true = Phase 1, false = Phase 3
bool     isLocked        = false;  // État du verrou
uint32_t lockUntilMs     = 0;      // Timestamp fin de pause (15 min)
bool     emergencyUsed   = false;  // Mode urgence déjà utilisé aujourd'hui

// ─────────────────────────────────────────────────────────────
// ÉTAT DE DÉTECTION
// ─────────────────────────────────────────────────────────────
bool     puffInProgress   = false;
uint32_t puffStartMs      = 0;
uint32_t adcSum           = 0;
uint16_t adcSamples       = 0;

// ─────────────────────────────────────────────────────────────
// BLE — SERVICE GATT CUSTOM
// UUIDs 128 bits générés (uniques à Quitly)
// ─────────────────────────────────────────────────────────────
// Service principal
BLEService quitlySvc("A1B2C3D4-0001-0000-0000-000000000000");

// Caractéristiques
BLECharacteristic puffNotifyChar(   // Notify : nouvelle bouffée enregistrée
  "A1B2C3D4-0001-0001-0000-000000000000",
  BLENotify, 7
);
BLECharacteristic historyChar(      // Read : dump historique en batch
  "A1B2C3D4-0001-0002-0000-000000000000",
  BLERead | BLEWrite, 20            // Write pour demander le début du dump
);
BLECharacteristic programChar(      // Write : l'app envoie le programme
  "A1B2C3D4-0001-0003-0000-000000000000",
  BLERead | BLEWrite, 20
);
BLECharacteristic lockChar(         // Read : état verrou temps réel
  "A1B2C3D4-0001-0004-0000-000000000000",
  BLERead | BLENotify, 6
);
BLECharacteristic emergencyChar(    // Write : activation mode urgence
  "A1B2C3D4-0001-0005-0000-000000000000",
  BLEWrite, 1
);
BLECharacteristic statsChar(        // Read : stats journalières
  "A1B2C3D4-0001-0006-0000-000000000000",
  BLERead, 8
);

// ─────────────────────────────────────────────────────────────
// SETUP
// ─────────────────────────────────────────────────────────────
void setup() {
  Serial.begin(115200);
  // Attendre le moniteur série (utile en debug, retirer en prod)
  // while (!Serial) delay(10);

  // Init GPIO
  pinMode(PIN_MOSFET,    OUTPUT);
  pinMode(PIN_LED_RED,   OUTPUT);
  pinMode(PIN_LED_GREEN, OUTPUT);
  analogReadResolution(10);  // ADC 10 bits (0–1023)

  // Sécurité : MOSFET coupé au démarrage
  disableHeating();
  updateLEDs();

  // Init BLE
  Bluefruit.begin();
  Bluefruit.setName("Quitly-CE-01");
  Bluefruit.setTxPower(0);  // 0 dBm — économie batterie (portée ~10m largement suffisant)

  setupBLEService();
  startAdvertising();

  Serial.println("=== Quitly Prototype v0.1 ===");
  Serial.println("Phase 1 : Observation — aucune limite active");
  Serial.print("Seuil capteur ADC : ");
  Serial.println(PUFF_THRESHOLD_ADC);
}

// ─────────────────────────────────────────────────────────────
// LOOP PRINCIPALE
// ─────────────────────────────────────────────────────────────
void loop() {
  uint32_t now = millis();

  // ── 1. Vérification fin de pause (15 min) ────────────────
  if (isLocked && lockUntilMs > 0 && now >= lockUntilMs) {
    Serial.println("Pause terminée — 50 bouffées accordées");
    isLocked = false;
    lockUntilMs = 0;
    dailyBudget = dailyPuffCount + 50;  // 50 bouffées pour la fin de journée
    notifyLockState();
    updateLEDs();
  }

  // ── 2. Lecture capteur de débit ───────────────────────────
  int airflowADC = analogRead(PIN_AIRFLOW);
  bool isPuffDetected = (airflowADC < PUFF_THRESHOLD_ADC);

  // ── 3. Début de bouffée ───────────────────────────────────
  if (isPuffDetected && !puffInProgress) {
    if (!isLocked) {
      puffInProgress = true;
      puffStartMs    = now;
      adcSum         = airflowADC;
      adcSamples     = 1;
      enableHeating();  // Allume l'atomiseur
      Serial.println(">> Bouffée détectée");
    } else {
      // Tentative de bouffée alors que verrouillé
      Serial.println(">> Bloqué — verrou actif");
      flashRedLED();
    }
  }

  // ── 4. En cours de bouffée ────────────────────────────────
  if (puffInProgress) {
    adcSum += airflowADC;
    adcSamples++;

    // Sécurité anti-blocage : coupe après 8 secondes
    if (now - puffStartMs > PUFF_MAX_DURATION_MS) {
      Serial.println(">> Durée max atteinte — coupure sécurité");
      endPuff(now, true);
    }
  }

  // ── 5. Fin de bouffée ─────────────────────────────────────
  if (!isPuffDetected && puffInProgress) {
    endPuff(now, false);
  }

  delay(SAMPLE_RATE_MS);
}

// ─────────────────────────────────────────────────────────────
// FIN D'UNE BOUFFÉE — Enregistrement + vérifications
// ─────────────────────────────────────────────────────────────
void endPuff(uint32_t now, bool forcedStop) {
  puffInProgress = false;
  disableHeating();

  uint16_t duration = (uint16_t)(now - puffStartMs);
  uint8_t  avgFlow  = (uint8_t)(adcSamples > 0 ? adcSum / adcSamples : 0);

  // Filtrer les faux positifs (trop courts)
  if (duration < PUFF_MIN_DURATION_MS && !forcedStop) {
    Serial.println(">> Faux positif ignoré");
    return;
  }

  // Enregistrer la bouffée
  recordPuff(duration, avgFlow);

  Serial.print(">> Bouffée enregistrée : ");
  Serial.print(duration);
  Serial.print("ms | débit ADC: ");
  Serial.print(avgFlow);
  Serial.print(" | journalier: ");
  Serial.print(dailyPuffCount);
  Serial.print("/");
  Serial.println(dailyBudget >= 9999 ? "∞" : String(dailyBudget).c_str());

  // Vérification budget (Phase 3 uniquement)
  if (!isObservation) {
    checkDailyBudget();
  }
}

// ─────────────────────────────────────────────────────────────
// ENREGISTREMENT BOUFFÉE
// ─────────────────────────────────────────────────────────────
void recordPuff(uint16_t duration, uint8_t avgFlow) {
  // Incrémenter compteurs
  dailyPuffCount++;
  uint32_t ts = millis() / 1000;

  // Stocker dans l'historique RAM
  if (puffCount < MAX_PUFF_HISTORY) {
    puffHistory[puffCount] = { ts, duration, avgFlow };
    puffCount++;
  }
  // TODO v1.1 : débordement → écrire en Flash interne (Nordic FDS)

  // Notifier l'app BLE si connectée
  if (Bluefruit.connected()) {
    uint8_t payload[7];
    memcpy(payload,     &ts,       4);
    memcpy(payload + 4, &duration, 2);
    payload[6] = avgFlow;
    puffNotifyChar.notify(payload, 7);
    notifyLockState();
  }
}

// ─────────────────────────────────────────────────────────────
// VÉRIFICATION DU BUDGET JOURNALIER
// ─────────────────────────────────────────────────────────────
void checkDailyBudget() {
  if (dailyPuffCount >= dailyBudget) {
    activatePause();
  } else {
    // Avertissement à 5 bouffées de la limite
    int remaining = dailyBudget - dailyPuffCount;
    if (remaining <= 5) {
      Serial.print("⚠️  Plus que ");
      Serial.print(remaining);
      Serial.println(" bouffées aujourd'hui");
    }
  }
}

// ─────────────────────────────────────────────────────────────
// PAUSE OBLIGATOIRE 15 MIN
// ─────────────────────────────────────────────────────────────
void activatePause() {
  isLocked    = true;
  lockUntilMs = millis() + (15UL * 60UL * 1000UL);  // +15 minutes
  notifyLockState();
  updateLEDs();
  Serial.println("🔒 LIMITE ATTEINTE — Pause 15 min activée");
}

// ─────────────────────────────────────────────────────────────
// COMMANDE MOSFET (chauffage atomiseur)
// ─────────────────────────────────────────────────────────────
void enableHeating() {
  if (!isLocked) {
    digitalWrite(PIN_MOSFET, HIGH);
  }
}

void disableHeating() {
  digitalWrite(PIN_MOSFET, LOW);
}

// ─────────────────────────────────────────────────────────────
// LEDs
// ─────────────────────────────────────────────────────────────
void updateLEDs() {
  digitalWrite(PIN_LED_RED,   isLocked ? HIGH : LOW);
  digitalWrite(PIN_LED_GREEN, isLocked ? LOW  : HIGH);
}

void flashRedLED() {
  for (int i = 0; i < 3; i++) {
    digitalWrite(PIN_LED_RED, HIGH); delay(80);
    digitalWrite(PIN_LED_RED, LOW);  delay(80);
  }
  updateLEDs();
}

// ─────────────────────────────────────────────────────────────
// BLE — CONFIGURATION DU SERVICE GATT
// ─────────────────────────────────────────────────────────────
void setupBLEService() {
  quitlySvc.begin();

  // Caractéristique : nouvelles bouffées (Notify)
  puffNotifyChar.setProperties(CHR_PROPS_NOTIFY);
  puffNotifyChar.setPermission(SECMODE_OPEN, SECMODE_NO_ACCESS);
  puffNotifyChar.setFixedLen(7);
  puffNotifyChar.begin();

  // Caractéristique : dump historique (Read/Write)
  historyChar.setProperties(CHR_PROPS_READ | CHR_PROPS_WRITE);
  historyChar.setPermission(SECMODE_OPEN, SECMODE_OPEN);
  historyChar.setWriteCallback(onHistoryRequest);
  historyChar.begin();

  // Caractéristique : programme (Write depuis l'app)
  // Format : [budget_lo, budget_hi, isObservation, reserved×17]
  programChar.setProperties(CHR_PROPS_READ | CHR_PROPS_WRITE);
  programChar.setPermission(SECMODE_OPEN, SECMODE_OPEN);
  programChar.setWriteCallback(onProgramUpdate);
  programChar.begin();

  // Caractéristique : état verrou (Read + Notify)
  // Format : [isLocked, puffsToday_lo, puffsToday_hi, budget_lo, budget_hi, remaining]
  lockChar.setProperties(CHR_PROPS_READ | CHR_PROPS_NOTIFY);
  lockChar.setPermission(SECMODE_OPEN, SECMODE_NO_ACCESS);
  lockChar.setFixedLen(6);
  lockChar.begin();

  // Caractéristique : mode urgence (Write)
  // Envoyer 0xAA pour activer
  emergencyChar.setProperties(CHR_PROPS_WRITE);
  emergencyChar.setPermission(SECMODE_NO_ACCESS, SECMODE_OPEN);
  emergencyChar.setWriteCallback(onEmergencyActivate);
  emergencyChar.begin();

  // Caractéristique : stats journalières (Read)
  // Format : [count_lo, count_hi, budget_lo, budget_hi, phase, locked, reserved×2]
  statsChar.setProperties(CHR_PROPS_READ);
  statsChar.setPermission(SECMODE_OPEN, SECMODE_NO_ACCESS);
  statsChar.setFixedLen(8);
  statsChar.begin();
}

// ─────────────────────────────────────────────────────────────
// BLE — CALLBACKS
// ─────────────────────────────────────────────────────────────

// L'app demande l'historique complet (batch sync)
void onHistoryRequest(uint16_t conn_handle, BLECharacteristic* chr,
                      uint8_t* data, uint16_t len) {
  Serial.print("📲 Sync demandée — ");
  Serial.print(puffCount);
  Serial.println(" bouffées à envoyer");

  // Envoi en chunks de 20 octets (MTU BLE standard)
  // Chaque bouffée = 7 octets → 2 bouffées par paquet + 6 octets de padding
  // Pour le prototype : on envoie simplement les stats globales
  // v1.1 : implémenter le streaming complet via Notifications

  // Prépare une réponse avec les stats
  updateStatsChar();
  Serial.println("Stats mises à jour — app peut lire statsChar");
}

// L'app envoie un nouveau programme
// Format attendu : [budget_lo, budget_hi, phase_byte, ...réservé]
// phase_byte : 0x01 = Observation, 0x03 = Programme actif
void onProgramUpdate(uint16_t conn_handle, BLECharacteristic* chr,
                     uint8_t* data, uint16_t len) {
  if (len < 3) return;

  uint16_t newBudget = (uint16_t)data[0] | ((uint16_t)data[1] << 8);
  uint8_t  phase     = data[2];

  dailyBudget   = newBudget;
  isObservation = (phase == 0x01);

  // Réinitialiser le verrou si nouveau programme reçu
  isLocked    = false;
  lockUntilMs = 0;
  updateLEDs();
  notifyLockState();

  Serial.print("📥 Programme reçu — Budget: ");
  Serial.print(newBudget);
  Serial.print(" | Phase: ");
  Serial.println(isObservation ? "Observation" : "Programme actif");
}

// L'utilisateur active le mode urgence depuis l'app
void onEmergencyActivate(uint16_t conn_handle, BLECharacteristic* chr,
                         uint8_t* data, uint16_t len) {
  if (len < 1 || data[0] != 0xAA) return;  // Code secret 0xAA

  if (emergencyUsed) {
    Serial.println("🚫 Mode urgence déjà utilisé aujourd'hui");
    return;
  }

  emergencyUsed = true;
  isLocked      = false;
  lockUntilMs   = 0;
  dailyBudget   = dailyPuffCount + 15;  // +15 bouffées
  updateLEDs();
  notifyLockState();
  Serial.println("🆘 Mode urgence activé — +15 bouffées");
}

// ─────────────────────────────────────────────────────────────
// BLE — NOTIFICATIONS ÉTAT VERROU
// ─────────────────────────────────────────────────────────────
void notifyLockState() {
  uint8_t payload[6];
  payload[0] = isLocked ? 1 : 0;
  payload[1] = dailyPuffCount & 0xFF;
  payload[2] = (dailyPuffCount >> 8) & 0xFF;
  payload[3] = dailyBudget & 0xFF;
  payload[4] = (dailyBudget >> 8) & 0xFF;
  int rem = max(0, (int)dailyBudget - (int)dailyPuffCount);
  payload[5] = (uint8_t)min(rem, 255);

  lockChar.write(payload, 6);
  if (Bluefruit.connected()) {
    lockChar.notify(payload, 6);
  }
}

void updateStatsChar() {
  uint8_t payload[8];
  payload[0] = dailyPuffCount & 0xFF;
  payload[1] = (dailyPuffCount >> 8) & 0xFF;
  payload[2] = dailyBudget & 0xFF;
  payload[3] = (dailyBudget >> 8) & 0xFF;
  payload[4] = isObservation ? 0x01 : 0x03;
  payload[5] = isLocked ? 1 : 0;
  payload[6] = emergencyUsed ? 1 : 0;
  payload[7] = (uint8_t)min(puffCount, 255);
  statsChar.write(payload, 8);
}

// ─────────────────────────────────────────────────────────────
// BLE — ADVERTISING
// ─────────────────────────────────────────────────────────────
void startAdvertising() {
  Bluefruit.Advertising.addFlags(BLE_GAP_ADV_FLAGS_LE_ONLY_GENERAL_DISC_MODE);
  Bluefruit.Advertising.addTxPower();
  Bluefruit.Advertising.addService(quitlySvc);
  Bluefruit.Advertising.addName();

  // Intervalle advertising : 1 seconde (économie batterie)
  Bluefruit.Advertising.restartOnDisconnect(true);
  Bluefruit.Advertising.setInterval(1600, 1600);  // 1600 × 0.625ms = 1s
  Bluefruit.Advertising.setFastTimeout(30);       // 30s fast → slow
  Bluefruit.Advertising.start(0);                 // 0 = advertise indéfiniment

  Serial.println("BLE Advertising : Quitly-CE-01");
}
