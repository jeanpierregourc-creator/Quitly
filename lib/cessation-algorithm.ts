/**
 * QUITLY — ALGORITHME DE SEVRAGE TABAGIQUE
 * =========================================
 * Basé sur les revues scientifiques :
 * - Lindson-Hawley 2016 (Annals of Internal Medicine) — réduction progressive
 * - Cochrane 2019 (Lindson et al., 22 000 participants) — paliers & durées
 * - Sahr et al. 2020 (PMC6982503) — protocole taper e-cigarette
 * - Delphi Panel 2023 (PMC10466900) — consensus clinique ENDS
 * - Varenicline RCT (PMC4883651) — cibles de réduction (-50% S4, -75% S8)
 *
 * Durées de palier retenues :
 *   Fumeur léger  (<10 eq cig/j)  → 2 semaines/palier
 *   Fumeur modéré (10–20 eq cig/j) → 4 semaines/palier
 *   Fumeur lourd  (>20 eq cig/j)   → 6 semaines/palier
 *
 * Réduction nicotine : ~33% par palier (18→12→6→3→0 mg), 4 semaines/palier
 */

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export type SmokingProfile = 'light' | 'moderate' | 'heavy'
// light   = <10 cigarettes équivalent/jour   → programme ~4–5 mois
// moderate= 10–20 cig/jour                   → programme ~6–7 mois
// heavy   = >20 cig/jour                     → programme ~8–9 mois

export type ProgramPhase = 1 | 2 | 3

export type NicotineLevel = 18 | 12 | 6 | 3 | 0  // mg/mL

export interface PuffRecord {
  timestamp: number     // Unix ms
  duration: number      // millisecondes
  watts: number
}

/** Profil comportemental construit en Phase 1 */
export interface BehavioralProfile {
  userId: string
  observationStart: number   // timestamp début Phase 1
  observationEnd: number     // timestamp fin Phase 1
  dailyAvgPuffs: number      // moyenne bouffées/jour sur les 14 jours
  peakHours: number[]        // heures [0–23] avec consommation > moyenne*1.5
  weakHours: number[]        // heures [0–23] avec consommation < moyenne*0.5
  firstPuffAfterWakeMin: number  // minutes après le réveil pour la 1ère bouffée
  morningIntensity: number   // bouffées entre 6h et 10h
  smokingProfile: SmokingProfile
  cigarettesEquivPerDay: number  // calculé : puffs/jour / 15 (≈ 1 cig = 15 bouffées)
}

/** Programme personnalisé généré pour l'utilisateur */
export interface CessationProgram {
  userId: string
  generatedAt: number
  profile: BehavioralProfile
  totalDurationWeeks: number
  steps: ReductionStep[]
  nicotineSchedule: NicotineStep[]
  targetQuitDate: number     // timestamp
}

/** Un palier de réduction de bouffées */
export interface ReductionStep {
  stepNumber: number
  startDate: number          // timestamp
  endDate: number            // timestamp
  durationWeeks: number
  dailyPuffBudget: number    // bouffées autorisées/jour
  reductionPct: number       // % de réduction vs baseline
  lockedHours: number[]      // heures du jour verrouillées en priorité
  isFinalStep: boolean       // dernier palier avant arrêt total
}

/** Un palier de réduction de nicotine */
export interface NicotineStep {
  stepNumber: number
  startDate: number
  endDate: number
  targetMgPerMl: NicotineLevel
  previousMgPerMl: NicotineLevel | null
  reductionPct: number
}

/** État en temps réel du verrou */
export interface LockState {
  isLocked: boolean
  lockReason: 'daily_limit' | 'hourly_lock' | 'pause_15min' | null
  lockedUntil: number | null    // timestamp fin de blocage
  puffsUsedToday: number
  dailyBudget: number
  puffsRemainingToday: number
  emergencyUsedToday: boolean
  emergencyAvailable: boolean
  currentStep: ReductionStep | null
}

/** Résultat d'une demande de bouffée */
export interface PuffRequest {
  allowed: boolean
  reason: string
  lockState: LockState
  notification?: string         // message à afficher dans l'app
}

/** Résultat de progression de palier */
export interface StepProgressionResult {
  advanced: boolean             // true = passage au palier suivant
  extended: boolean             // true = palier prolongé (échec partiel)
  newStep: ReductionStep
  message: string
}

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTES (basées sur la littérature)
// ─────────────────────────────────────────────────────────────────────────────

/** Durée des paliers en semaines selon profil (Cochrane 2019, Varenicline RCT) */
const STEP_DURATION_WEEKS: Record<SmokingProfile, number> = {
  light:    2,   // <10 cig/j — 2 semaines par palier
  moderate: 4,   // 10–20 cig/j — 4 semaines par palier
  heavy:    6,   // >20 cig/j — 6 semaines par palier
}

/**
 * Cibles de réduction par palier en % du baseline (Varenicline RCT, Lindson-Hawley)
 * Palier 1 : -50%   (objectif clinique semaine 4)
 * Palier 2 : -65%
 * Palier 3 : -75%   (objectif clinique semaine 8)
 * Palier 4 : -85%
 * Palier 5 : -95%
 * Palier final : 0 bouffées (arrêt total)
 */
const REDUCTION_TARGETS_PCT = [50, 65, 75, 85, 92, 97, 100]

/**
 * Niveaux de nicotine et durées (Sahr 2020, PMC6982503)
 * Réduction ~33% par palier, 4 semaines/palier
 */
const NICOTINE_SCHEDULE: Array<{ mg: NicotineLevel; durationWeeks: number }> = [
  { mg: 12, durationWeeks: 4 },
  { mg: 6,  durationWeeks: 4 },
  { mg: 3,  durationWeeks: 4 },
  { mg: 0,  durationWeeks: 4 },
]

/** Seuil d'une "forte dépendance horaire" vs "faible" (× la moyenne) */
const PEAK_MULTIPLIER = 1.5
const WEAK_MULTIPLIER = 0.5

/** Équivalence 1 cigarette ≈ 15 bouffées d'e-cigarette */
const PUFFS_PER_CIG_EQUIVALENT = 15

/** Mode urgence */
const EMERGENCY_PUFFS = 15       // bouffées autorisées en mode urgence
const EMERGENCY_MAX_PER_DAY = 1  // 1 utilisation urgence/jour

/** Après la pause 15 min : budget pour le reste de la journée */
const POST_PAUSE_PUFFS = 50

/** Durée de la pause obligatoire en ms (15 minutes) */
const PAUSE_DURATION_MS = 15 * 60 * 1000

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 1 — ANALYSE COMPORTEMENTALE
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Analyse les données brutes de Phase 1 (2 semaines d'observation)
 * et génère le profil comportemental de l'utilisateur.
 *
 * @param userId       ID utilisateur
 * @param puffRecords  Toutes les bouffées enregistrées en Phase 1
 * @param wakeTimeHour Heure de réveil habituelle déclarée par l'utilisateur
 * @param startDate    Timestamp début Phase 1
 */
export function buildBehavioralProfile(
  userId: string,
  puffRecords: PuffRecord[],
  wakeTimeHour: number,
  startDate: number,
): BehavioralProfile {
  const OBSERVATION_DAYS = 14
  const endDate = startDate + OBSERVATION_DAYS * 24 * 3600 * 1000

  // Filtrer les records dans la période
  const records = puffRecords.filter(
    r => r.timestamp >= startDate && r.timestamp <= endDate
  )

  const totalPuffs = records.length
  const dailyAvgPuffs = totalPuffs / OBSERVATION_DAYS

  // Distribution horaire : combien de bouffées par heure [0..23]
  const hourlyCount = new Array(24).fill(0) as number[]
  records.forEach(r => {
    const hour = new Date(r.timestamp).getHours()
    hourlyCount[hour]++
  })

  // Moyenne horaire pondérée sur les jours actifs
  const avgPerHour = dailyAvgPuffs / 24

  const peakHours = hourlyCount
    .map((count, h) => ({ h, daily: count / OBSERVATION_DAYS }))
    .filter(x => x.daily >= avgPerHour * PEAK_MULTIPLIER)
    .map(x => x.h)
    .sort((a, b) => a - b)

  const weakHours = hourlyCount
    .map((count, h) => ({ h, daily: count / OBSERVATION_DAYS }))
    .filter(x => x.daily > 0 && x.daily <= avgPerHour * WEAK_MULTIPLIER)
    .map(x => x.h)
    .sort((a, b) => a - b)

  // Bouffées dans les 30 minutes après le réveil (indicateur de dépendance matinale)
  const morningRecords = records.filter(r => {
    const h = new Date(r.timestamp).getHours()
    const m = new Date(r.timestamp).getMinutes()
    const minutesFromWake = (h - wakeTimeHour) * 60 + m
    return minutesFromWake >= 0 && minutesFromWake <= 30
  })
  const firstPuffAfterWakeMin = morningRecords.length > 0
    ? Math.min(...morningRecords.map(r => {
        const h = new Date(r.timestamp).getHours()
        const m = new Date(r.timestamp).getMinutes()
        return (h - wakeTimeHour) * 60 + m
      }))
    : 60

  // Intensité matinale (6h–10h)
  const morningIntensity = records.filter(r => {
    const h = new Date(r.timestamp).getHours()
    return h >= 6 && h < 10
  }).length / OBSERVATION_DAYS

  // Profil de fumeur selon équivalent cigarettes
  const cigarettesEquivPerDay = dailyAvgPuffs / PUFFS_PER_CIG_EQUIVALENT
  const smokingProfile: SmokingProfile =
    cigarettesEquivPerDay < 10 ? 'light' :
    cigarettesEquivPerDay <= 20 ? 'moderate' : 'heavy'

  return {
    userId,
    observationStart: startDate,
    observationEnd: endDate,
    dailyAvgPuffs,
    peakHours,
    weakHours,
    firstPuffAfterWakeMin,
    morningIntensity,
    smokingProfile,
    cigarettesEquivPerDay,
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SCORE DE DÉPENDANCE (adapté Fagerström sans consultation médicale)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Score de dépendance comportementale [0–10] basé sur le profil Phase 1.
 * Adapté du Test de Fagerström (FTND) pour e-cigarette.
 *
 * Score 0–3 : faible dépendance  → programme accéléré possible
 * Score 4–6 : dépendance modérée → programme standard
 * Score 7–10: forte dépendance   → programme étendu, paliers plus longs
 */
export function computeDependencyScore(profile: BehavioralProfile): number {
  let score = 0

  // Critère 1 : première bouffée après réveil (max 3 pts — indicateur le plus prédictif)
  if (profile.firstPuffAfterWakeMin <= 5)       score += 3
  else if (profile.firstPuffAfterWakeMin <= 30) score += 2
  else if (profile.firstPuffAfterWakeMin <= 60) score += 1

  // Critère 2 : consommation journalière (max 3 pts)
  if (profile.cigarettesEquivPerDay > 30)      score += 3
  else if (profile.cigarettesEquivPerDay > 20) score += 2
  else if (profile.cigarettesEquivPerDay > 10) score += 1

  // Critère 3 : concentration des pics (max 2 pts) — plus les pics sont intenses,
  // plus la dépendance situationnelle est forte
  const peakConcentration = profile.peakHours.length / 24
  if (peakConcentration >= 0.3)      score += 2
  else if (peakConcentration >= 0.15) score += 1

  // Critère 4 : intensité matinale (max 2 pts)
  if (profile.morningIntensity >= profile.dailyAvgPuffs * 0.4)     score += 2
  else if (profile.morningIntensity >= profile.dailyAvgPuffs * 0.2) score += 1

  return Math.min(score, 10)
}

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 3 — GÉNÉRATION DU PROGRAMME PERSONNALISÉ
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Génère le programme complet de réduction adapté au profil de l'utilisateur.
 *
 * Logique des paliers :
 * - La durée de chaque palier dépend du profil (2/4/6 semaines)
 * - La réduction suit les cibles validées cliniquement : -50%, -65%, -75%...
 * - Le verrouillage commence par les "heures faibles" (faible dépendance)
 *   et s'étend progressivement vers les "heures pics"
 * - Le planning nicotine est dissocié (suit son propre calendrier de 4 semaines/palier)
 *
 * @param profile         Profil comportemental Phase 1
 * @param phase3StartDate Timestamp de début de Phase 3
 * @param yearsSmoked     Ancienneté du tabagisme (ajuste la durée totale)
 * @param startNicoLevel  Niveau de nicotine actuel (mg/mL) déclaré via QR code
 */
export function generateCessationProgram(
  profile: BehavioralProfile,
  phase3StartDate: number,
  yearsSmoked: number,
  startNicoLevel: NicotineLevel = 18,
): CessationProgram {
  const stepDurationWeeks = getStepDurationWeeks(profile, yearsSmoked)
  const reductionSteps = buildReductionSteps(profile, phase3StartDate, stepDurationWeeks)
  const nicotineSchedule = buildNicotineSchedule(phase3StartDate, startNicoLevel)

  const lastStep = reductionSteps[reductionSteps.length - 1]
  const totalDurationWeeks = Math.round(
    (lastStep.endDate - phase3StartDate) / (7 * 24 * 3600 * 1000)
  )

  return {
    userId: profile.userId,
    generatedAt: Date.now(),
    profile,
    totalDurationWeeks,
    steps: reductionSteps,
    nicotineSchedule,
    targetQuitDate: lastStep.endDate,
  }
}

/**
 * Calcule la durée d'un palier en semaines selon le profil ET l'ancienneté.
 * Les fumeurs de longue date ont des paliers légèrement plus longs.
 */
function getStepDurationWeeks(profile: BehavioralProfile, yearsSmoked: number): number {
  let baseDuration = STEP_DURATION_WEEKS[profile.smokingProfile]

  // Bonus ancienneté : +1 semaine si >10 ans de tabagisme, +2 semaines si >20 ans
  if (yearsSmoked >= 20) baseDuration += 2
  else if (yearsSmoked >= 10) baseDuration += 1

  return baseDuration
}

/**
 * Construit la séquence des paliers de réduction de bouffées.
 * Chaque palier déverrouille progressivement les heures faibles en premier,
 * puis s'attaque aux heures pics à mesure que la réduction s'intensifie.
 */
function buildReductionSteps(
  profile: BehavioralProfile,
  startDate: number,
  stepDurationWeeks: number,
): ReductionStep[] {
  const steps: ReductionStep[] = []
  const msPerWeek = 7 * 24 * 3600 * 1000
  const baseline = profile.dailyAvgPuffs

  // Construire la liste des heures à verrouiller progressivement :
  // D'abord les heures faibles (facile), ensuite les heures neutres, enfin les pics
  const allHours = Array.from({ length: 24 }, (_, i) => i)
  const peakSet = new Set(profile.peakHours)
  const weakSet = new Set(profile.weakHours)
  const neutralHours = allHours.filter(h => !peakSet.has(h) && !weakSet.has(h))
  const orderedHoursToLock = [
    ...profile.weakHours,
    ...neutralHours,
    ...profile.peakHours,
  ]

  let currentDate = startDate
  let cumulativeLockedHours: number[] = []
  const maxSteps = REDUCTION_TARGETS_PCT.length

  for (let i = 0; i < maxSteps; i++) {
    const reductionPct = REDUCTION_TARGETS_PCT[i]
    const isFinalStep = reductionPct >= 100

    // Budget quotidien de bouffées pour ce palier
    const dailyPuffBudget = isFinalStep
      ? 0
      : Math.max(0, Math.round(baseline * (1 - reductionPct / 100)))

    // Heures verrouillées : proportion des heures totales = proportion de la réduction
    const hoursToLockCount = Math.min(
      Math.round((reductionPct / 100) * 24),
      orderedHoursToLock.length
    )
    cumulativeLockedHours = orderedHoursToLock.slice(0, hoursToLockCount)

    const stepStart = currentDate
    const stepEnd = currentDate + stepDurationWeeks * msPerWeek

    steps.push({
      stepNumber: i + 1,
      startDate: stepStart,
      endDate: stepEnd,
      durationWeeks: stepDurationWeeks,
      dailyPuffBudget,
      reductionPct,
      lockedHours: [...cumulativeLockedHours],
      isFinalStep,
    })

    currentDate = stepEnd

    if (isFinalStep) break
  }

  return steps
}

/**
 * Construit le calendrier de réduction de nicotine.
 * Basé sur le protocole Sahr 2020 : ~33% par palier, 4 semaines/palier.
 * Commence au niveau détecté via QR code au moment de la Phase 3.
 */
function buildNicotineSchedule(
  phase3StartDate: number,
  startNicoLevel: NicotineLevel,
): NicotineStep[] {
  const steps: NicotineStep[] = []
  const msPerWeek = 7 * 24 * 3600 * 1000

  // Trouver la position de départ dans le programme nicotine
  const fullSchedule: NicotineLevel[] = [18, 12, 6, 3, 0]
  const startIndex = fullSchedule.indexOf(startNicoLevel)
  if (startIndex === -1) return []

  // Les paliers à partir du niveau de départ
  const remainingLevels = fullSchedule.slice(startIndex + 1)

  let currentDate = phase3StartDate
  let previousMg: NicotineLevel | null = startNicoLevel

  remainingLevels.forEach((mg, i) => {
    const durationWeeks = NICOTINE_SCHEDULE.find(s => s.mg === mg)?.durationWeeks ?? 4
    const reductionPct = previousMg
      ? Math.round(((previousMg - mg) / previousMg) * 100)
      : 100

    steps.push({
      stepNumber: i + 1,
      startDate: currentDate,
      endDate: currentDate + durationWeeks * msPerWeek,
      targetMgPerMl: mg,
      previousMgPerMl: previousMg,
      reductionPct,
    })

    currentDate += durationWeeks * msPerWeek
    previousMg = mg
  })

  return steps
}

// ─────────────────────────────────────────────────────────────────────────────
// MOTEUR EN TEMPS RÉEL — VERROU INTELLIGENT
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Évalue si une bouffée est autorisée en temps réel.
 * Appelée à chaque tentative d'utilisation de la CE.
 *
 * Règles dans l'ordre de priorité :
 * 1. Si heure actuelle est dans une heure verrouillée → refus
 * 2. Si en pause obligatoire (15 min) → refus avec countdown
 * 3. Si budget journalier épuisé → déclenche pause 15 min, puis 50 bouffées restantes
 * 4. Sinon → autorisé, décrémente le compteur
 */
export function evaluatePuffRequest(
  program: CessationProgram,
  puffsUsedToday: number,
  pauseStartedAt: number | null,
  emergencyUsedToday: boolean,
  now: number = Date.now(),
): PuffRequest {
  const currentStep = getCurrentStep(program, now)

  if (!currentStep) {
    // Phase terminée — arrêt total
    return {
      allowed: false,
      reason: 'Programme terminé — vous avez arrêté de vapoter. Félicitations !',
      lockState: buildLockState(null, puffsUsedToday, 0, pauseStartedAt, emergencyUsedToday, now),
    }
  }

  const budget = currentStep.dailyPuffBudget
  const hour = new Date(now).getHours()

  // Règle 1 : heure verrouillée (indépendant du budget)
  if (currentStep.lockedHours.includes(hour)) {
    return {
      allowed: false,
      reason: `Heure verrouillée — cette plage horaire fait partie de votre programme de réduction.`,
      lockState: buildLockState(currentStep, puffsUsedToday, budget, pauseStartedAt, emergencyUsedToday, now),
      notification: `⏰ Heure verrouillée. Prochaine disponibilité à ${getNextUnlockedHour(currentStep, now)}h`,
    }
  }

  // Règle 2 : pause obligatoire en cours
  if (pauseStartedAt !== null) {
    const pauseEndsAt = pauseStartedAt + PAUSE_DURATION_MS
    if (now < pauseEndsAt) {
      const remainingMin = Math.ceil((pauseEndsAt - now) / 60000)
      return {
        allowed: false,
        reason: `Pause de 15 minutes en cours — encore ${remainingMin} min.`,
        lockState: {
          isLocked: true,
          lockReason: 'pause_15min',
          lockedUntil: pauseEndsAt,
          puffsUsedToday,
          dailyBudget: budget,
          puffsRemainingToday: POST_PAUSE_PUFFS,
          emergencyUsedToday,
          emergencyAvailable: !emergencyUsedToday,
          currentStep,
        },
        notification: `⏸ Pause en cours — encore ${remainingMin} min avant de reprendre.`,
      }
    }
  }

  // Règle 3 : budget journalier épuisé → déclenche la pause
  if (puffsUsedToday >= budget) {
    return {
      allowed: false,
      reason: `Limite journalière atteinte (${budget} bouffées). Pause de 15 minutes activée.`,
      lockState: {
        isLocked: true,
        lockReason: 'daily_limit',
        lockedUntil: now + PAUSE_DURATION_MS,
        puffsUsedToday,
        dailyBudget: budget,
        puffsRemainingToday: 0,
        emergencyUsedToday,
        emergencyAvailable: !emergencyUsedToday,
        currentStep,
      },
      notification: `🔒 Limite atteinte — pause 15 min activée. Après la pause : ${POST_PAUSE_PUFFS} bouffées disponibles.`,
    }
  }

  // OK — bouffée autorisée
  const remaining = budget - puffsUsedToday - 1
  return {
    allowed: true,
    reason: 'Autorisé',
    lockState: buildLockState(currentStep, puffsUsedToday + 1, budget, null, emergencyUsedToday, now),
    notification: remaining <= 5 && remaining > 0
      ? `⚠️ Plus que ${remaining} bouffée${remaining > 1 ? 's' : ''} aujourd'hui.`
      : undefined,
  }
}

/**
 * Active le mode urgence.
 * Donne accès à EMERGENCY_PUFFS bouffées supplémentaires pour la journée.
 * Utilisable une seule fois par jour.
 */
export function activateEmergencyMode(
  emergencyUsedToday: boolean,
): { success: boolean; message: string; extraPuffs: number } {
  if (emergencyUsedToday) {
    return {
      success: false,
      message: 'Mode urgence déjà utilisé aujourd\'hui. Réessayez demain.',
      extraPuffs: 0,
    }
  }
  return {
    success: true,
    message: `Mode urgence activé — ${EMERGENCY_PUFFS} bouffées supplémentaires accordées.`,
    extraPuffs: EMERGENCY_PUFFS,
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// PROGRESSION DES PALIERS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Évalue si l'utilisateur peut passer au palier suivant ou si le palier
 * actuel doit être prolongé (en cas de dépassement fréquent).
 *
 * Règle scientifique (Sahr 2020, Delphi 2023) :
 * "Si un palier ne peut pas être complété, répéter ce palier avant d'avancer."
 *
 * Ici, on prolonge légèrement si l'utilisateur a dépassé son budget
 * plus de 30% des jours du palier.
 *
 * @param step           Palier actuel
 * @param dailyOverruns  Nombre de jours où le budget a été dépassé
 * @param totalDays      Nombre de jours de ce palier
 * @param nextStep       Palier suivant (si existant)
 */
export function evaluateStepProgression(
  step: ReductionStep,
  dailyOverruns: number,
  totalDays: number,
  nextStep: ReductionStep | null,
): StepProgressionResult {
  const overrunRate = totalDays > 0 ? dailyOverruns / totalDays : 0
  const EXTENSION_THRESHOLD = 0.30  // >30% de jours en dépassement → prolongation

  if (overrunRate > EXTENSION_THRESHOLD) {
    // Prolonger le palier actuel de (stepDuration / 2) semaines
    const extensionWeeks = Math.max(1, Math.round(step.durationWeeks / 2))
    const extendedStep: ReductionStep = {
      ...step,
      endDate: step.endDate + extensionWeeks * 7 * 24 * 3600 * 1000,
      durationWeeks: step.durationWeeks + extensionWeeks,
    }
    return {
      advanced: false,
      extended: true,
      newStep: extendedStep,
      message: `Palier prolongé de ${extensionWeeks} semaine${extensionWeeks > 1 ? 's' : ''} pour consolider vos progrès. Vous y êtes presque !`,
    }
  }

  if (!nextStep) {
    return {
      advanced: false,
      extended: false,
      newStep: step,
      message: 'Dernier palier atteint — objectif d\'arrêt total en vue !',
    }
  }

  return {
    advanced: true,
    extended: false,
    newStep: nextStep,
    message: `Félicitations ! Palier ${step.stepNumber} validé. Nouveau palier : ${nextStep.dailyPuffBudget} bouffées/jour.`,
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// EFFET MIROIR — DONNÉES RENVOYÉES À L'UTILISATEUR (Phase 2)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Génère les insights comportementaux à montrer à l'utilisateur en Phase 2.
 * C'est l'"effet miroir" : ses propres données lui sont renvoyées avec du contexte.
 */
export interface MirrorInsight {
  type: 'peak' | 'trigger' | 'progress' | 'info'
  title: string
  description: string
  data?: Record<string, number | string>
}

export function generateMirrorInsights(profile: BehavioralProfile): MirrorInsight[] {
  const insights: MirrorInsight[] = []

  // Insight 1 : consommation quotidienne
  insights.push({
    type: 'info',
    title: 'Votre consommation quotidienne',
    description: `En moyenne, vous prenez ${Math.round(profile.dailyAvgPuffs)} bouffées par jour, soit l'équivalent de ${profile.cigarettesEquivPerDay.toFixed(1)} cigarettes.`,
    data: {
      dailyPuffs: Math.round(profile.dailyAvgPuffs),
      cigaretteEquiv: parseFloat(profile.cigarettesEquivPerDay.toFixed(1)),
    },
  })

  // Insight 2 : heures de pics
  if (profile.peakHours.length > 0) {
    const peakStr = profile.peakHours.map(h => `${h}h`).join(', ')
    insights.push({
      type: 'peak',
      title: 'Vos moments de forte envie',
      description: `Votre consommation est la plus élevée à : ${peakStr}. Ce sont ces moments qui seront traités en priorité dans votre programme.`,
      data: { peakHours: profile.peakHours.join(',') },
    })
  }

  // Insight 3 : dépendance matinale
  if (profile.firstPuffAfterWakeMin <= 30) {
    insights.push({
      type: 'trigger',
      title: 'Dépendance matinale détectée',
      description: `Vous vapotez ${profile.firstPuffAfterWakeMin} minutes après votre réveil. C'est un indicateur fort de dépendance physique — votre programme en tient compte.`,
      data: { minutesAfterWake: profile.firstPuffAfterWakeMin },
    })
  }

  // Insight 4 : moments de faible consommation (opportunités)
  if (profile.weakHours.length > 0) {
    const weakStr = profile.weakHours.slice(0, 5).map(h => `${h}h`).join(', ')
    insights.push({
      type: 'progress',
      title: 'Vos points de force',
      description: `Vous vapotez peu (ou pas) à : ${weakStr}. Le programme commencera par consolider ces moments — ils seront les premiers à être verrouillés.`,
      data: { weakHours: profile.weakHours.slice(0, 5).join(',') },
    })
  }

  return insights
}

// ─────────────────────────────────────────────────────────────────────────────
// UTILITAIRES
// ─────────────────────────────────────────────────────────────────────────────

/** Retourne le palier actif pour une date donnée */
export function getCurrentStep(
  program: CessationProgram,
  now: number = Date.now(),
): ReductionStep | null {
  return program.steps.find(s => now >= s.startDate && now < s.endDate) ?? null
}

/** Retourne le palier nicotine actif pour une date donnée */
export function getCurrentNicotineStep(
  program: CessationProgram,
  now: number = Date.now(),
): NicotineStep | null {
  return program.nicotineSchedule.find(s => now >= s.startDate && now < s.endDate) ?? null
}

/** Calcule la prochaine heure non verrouillée */
function getNextUnlockedHour(step: ReductionStep, now: number): number {
  const currentHour = new Date(now).getHours()
  const locked = new Set(step.lockedHours)
  for (let i = 1; i <= 24; i++) {
    const h = (currentHour + i) % 24
    if (!locked.has(h)) return h
  }
  return (currentHour + 1) % 24
}

/** Construit un objet LockState complet */
function buildLockState(
  step: ReductionStep | null,
  puffsUsedToday: number,
  budget: number,
  pauseStartedAt: number | null,
  emergencyUsedToday: boolean,
  now: number,
): LockState {
  const isInPause = pauseStartedAt !== null && now < pauseStartedAt + PAUSE_DURATION_MS
  return {
    isLocked: isInPause || (step !== null && puffsUsedToday >= budget),
    lockReason: isInPause ? 'pause_15min' : null,
    lockedUntil: isInPause ? pauseStartedAt! + PAUSE_DURATION_MS : null,
    puffsUsedToday,
    dailyBudget: budget,
    puffsRemainingToday: Math.max(0, budget - puffsUsedToday),
    emergencyUsedToday,
    emergencyAvailable: !emergencyUsedToday,
    currentStep: step,
  }
}

/** Remet les compteurs à zéro chaque jour (à appeler à minuit) */
export function resetDailyCounters(): {
  puffsUsedToday: number
  pauseStartedAt: null
  emergencyUsedToday: boolean
} {
  return {
    puffsUsedToday: 0,
    pauseStartedAt: null,
    emergencyUsedToday: false,
  }
}

/**
 * Calcule le pourcentage de progression global du programme.
 * Utile pour la barre de progression dans l'app.
 */
export function computeOverallProgress(
  program: CessationProgram,
  now: number = Date.now(),
): number {
  const start = program.steps[0]?.startDate ?? now
  const end = program.targetQuitDate
  if (end <= start) return 100
  const pct = ((now - start) / (end - start)) * 100
  return Math.min(100, Math.max(0, parseFloat(pct.toFixed(1))))
}
