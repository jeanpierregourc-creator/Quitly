const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Colors
const DARK = '#080E14';
const TEAL = '#00D4AA';
const GRAY = '#1A2430';
const WHITE = '#FFFFFF';
const LIGHT_GRAY = '#E8EDF2';
const MUTED = '#8A9BAE';

const outputPath = path.join(__dirname, '..', 'public', 'documents', 'plaquette-distributeur.pdf');

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 0, bottom: 0, left: 0, right: 0 },
  info: {
    Title: 'Quitly — Plaquette Distributeur',
    Author: 'Quitly',
    Subject: 'Devenir Distributeur Quitly',
    Keywords: 'quitly, distributeur, cigarette electronique, sevrage tabagique',
  }
});

doc.pipe(fs.createWriteStream(outputPath));

const W = 595.28; // A4 width in points
const H = 841.89; // A4 height in points

// ─────────────────────────────────────────────
// PAGE 1 — COVER
// ─────────────────────────────────────────────

// Dark background
doc.rect(0, 0, W, H).fill(DARK);

// Teal accent bar top
doc.rect(0, 0, W, 6).fill(TEAL);

// Decorative circle top right
doc.circle(W - 60, 80, 120).fillOpacity(0.05).fill(TEAL).fillOpacity(1);
doc.circle(W - 60, 80, 80).fillOpacity(0.06).fill(TEAL).fillOpacity(1);

// Logo area
doc.fontSize(28).fillColor(TEAL).font('Helvetica-Bold')
   .text('QUITLY', 60, 50, { characterSpacing: 6 });

doc.fontSize(9).fillColor(MUTED).font('Helvetica')
   .text('DOSSIER DISTRIBUTEUR CONFIDENTIEL', 60, 82, { characterSpacing: 2 });

// Horizontal separator
doc.moveTo(60, 100).lineTo(W - 60, 100).strokeColor(GRAY).lineWidth(1).stroke();

// Main headline
doc.fontSize(42).fillColor(WHITE).font('Helvetica-Bold')
   .text('Rejoignez le', 60, 160)
   .text('réseau Quitly.', 60, 210);

doc.fontSize(16).fillColor(TEAL).font('Helvetica-Bold')
   .text('La cigarette électronique connectée', 60, 280)
   .text('pour le sevrage tabagique.', 60, 302);

// Value proposition box
doc.roundedRect(60, 350, W - 120, 90, 8).fill(GRAY);
doc.fontSize(13).fillColor(LIGHT_GRAY).font('Helvetica')
   .text('Proposez à vos clients une solution technologique complète :', 80, 368);
doc.fontSize(13).fillColor(TEAL).font('Helvetica-Bold')
   .text('dispositif connecté + application IA personnalisée + suivi continu.', 80, 390, { width: W - 160 });

// 3 key numbers
const stats = [
  { value: '38%', label: 'Marge brute\nsur le kit' },
  { value: '18€', label: 'Revenus mensuels\npar client actif' },
  { value: '216€', label: 'LTV annuelle\nestimée par client' },
];
const statStartY = 480;
const statW = (W - 120) / 3;

stats.forEach((stat, i) => {
  const x = 60 + i * statW;
  // Teal top bar
  doc.rect(x + 10, statStartY, statW - 20, 4).fill(TEAL);
  doc.fontSize(36).fillColor(TEAL).font('Helvetica-Bold')
     .text(stat.value, x + 10, statStartY + 18, { width: statW - 20, align: 'center' });
  doc.fontSize(10).fillColor(MUTED).font('Helvetica')
     .text(stat.label, x + 10, statStartY + 62, { width: statW - 20, align: 'center' });
});

// Bottom decorative element
doc.circle(80, H - 100, 200).fillOpacity(0.03).fill(TEAL).fillOpacity(1);

// Website & contact
doc.moveTo(60, H - 80).lineTo(W - 60, H - 80).strokeColor(GRAY).lineWidth(1).stroke();
doc.fontSize(10).fillColor(MUTED).font('Helvetica')
   .text('www.quitly.fr  —  contact@quitly.fr  —  @quitly', 60, H - 65, { align: 'center', width: W - 120 });

// ─────────────────────────────────────────────
// PAGE 2 — WHY QUITLY / OPPORTUNITY
// ─────────────────────────────────────────────
doc.addPage();
doc.rect(0, 0, W, H).fill(WHITE);
doc.rect(0, 0, W, 6).fill(TEAL);

// Header
doc.rect(0, 6, W, 70).fill(DARK);
doc.fontSize(10).fillColor(TEAL).font('Helvetica-Bold')
   .text('QUITLY', 40, 22, { characterSpacing: 4 });
doc.fontSize(20).fillColor(WHITE).font('Helvetica-Bold')
   .text('Le marché & L\'opportunité', 40, 40);

// Section: market
doc.fontSize(15).fillColor(DARK).font('Helvetica-Bold')
   .text('Un marché sous-exploité, une demande croissante', 40, 100);
doc.moveTo(40, 120).lineTo(40 + 60, 120).strokeColor(TEAL).lineWidth(3).stroke();

const marketPoints = [
  { emoji: '🚬', text: '13 millions de fumeurs en France — 73% souhaitent arrêter (Santé Publique France)' },
  { emoji: '📉', text: 'Les cigarettes électroniques classiques saturent le marché — le consommateur cherche plus' },
  { emoji: '🤖', text: 'L\'IA appliquée à la santé : segment en explosion, Quitly est premier positionnement' },
  { emoji: '💊', text: 'Substituts nicotiniques = 360M€/an en France. Quitly capture ce budget différemment' },
];

let y = 135;
marketPoints.forEach(point => {
  doc.roundedRect(40, y, W - 80, 42, 6).fill('#F4F7FA');
  doc.fontSize(20).fillColor(DARK).text(point.emoji, 55, y + 10);
  doc.fontSize(11).fillColor('#2D3748').font('Helvetica')
     .text(point.text, 90, y + 14, { width: W - 145 });
  y += 52;
});

// Section: what makes Quitly different
doc.fontSize(15).fillColor(DARK).font('Helvetica-Bold')
   .text('Ce qui rend Quitly unique', 40, y + 15);
doc.moveTo(40, y + 35).lineTo(100, y + 35).strokeColor(TEAL).lineWidth(3).stroke();

y += 50;

const diffPoints = [
  {
    title: 'Dispositif connecté Bluetooth',
    desc: 'Contrôle de la consommation en temps réel via l\'app. Données envoyées au serveur pour analyse IA.'
  },
  {
    title: 'Application IA personnalisée',
    desc: 'Algorithme adaptatif qui ajuste le programme de sevrage à chaque profil fumeur. Coaching quotidien intégré.'
  },
  {
    title: 'Programme en 3 phases',
    desc: 'Observer → Conscientiser → Se libérer. 26 semaines de suivi structuré avec jalons mesurables.'
  },
  {
    title: 'Résultats mesurables',
    desc: 'Le client voit sa progression (-62% à 8 semaines en beta), ce qui réduit le taux d\'abandon.'
  },
];

diffPoints.forEach((pt, i) => {
  const col = i % 2;
  const row = Math.floor(i / 2);
  const px = 40 + col * ((W - 80) / 2 + 10);
  const py = y + row * 80;
  const bw = (W - 80) / 2 - 5;

  doc.roundedRect(px, py, bw, 70, 6).fill(DARK);
  doc.rect(px, py, 4, 70).fill(TEAL);
  doc.fontSize(11).fillColor(TEAL).font('Helvetica-Bold')
     .text(pt.title, px + 14, py + 10, { width: bw - 20 });
  doc.fontSize(9.5).fillColor(LIGHT_GRAY).font('Helvetica')
     .text(pt.desc, px + 14, py + 28, { width: bw - 20 });
});

y += 175;

// Legal note
doc.roundedRect(40, y, W - 80, 35, 5).fill('#FFF3CD');
doc.fontSize(9).fillColor('#7D6608').font('Helvetica')
   .text('⚠️  Bandeau légal TPD2 obligatoire sur tous supports : "La cigarette électronique contient de la nicotine, substance addictive."', 55, y + 12, { width: W - 110 });

// Footer
doc.fontSize(8).fillColor('#A0AEC0').font('Helvetica')
   .text('Quitly — Confidentiel — Ne pas diffuser sans autorisation', 40, H - 30, { align: 'center', width: W - 80 });

// ─────────────────────────────────────────────
// PAGE 3 — FINANCIAL MODEL
// ─────────────────────────────────────────────
doc.addPage();
doc.rect(0, 0, W, H).fill(WHITE);
doc.rect(0, 0, W, 6).fill(TEAL);

doc.rect(0, 6, W, 70).fill(DARK);
doc.fontSize(10).fillColor(TEAL).font('Helvetica-Bold')
   .text('QUITLY', 40, 22, { characterSpacing: 4 });
doc.fontSize(20).fillColor(WHITE).font('Helvetica-Bold')
   .text('Modèle Financier Distributeur', 40, 40);

// Primary financial block
doc.roundedRect(40, 100, W - 80, 130, 10).fill(DARK);
doc.fontSize(14).fillColor(TEAL).font('Helvetica-Bold')
   .text('Vos revenus sur le Kit Quitly Black Edition (130€ TTC)', 60, 118, { width: W - 120 });

const finRows = [
  ['Prix de vente conseillé', '130,00 €', WHITE],
  ['Votre prix d\'achat distributeur', '80,60 €', WHITE],
  ['Votre marge brute', '49,40 €  (38%)', TEAL],
];
let fy = 148;
finRows.forEach(([label, value, color]) => {
  doc.fontSize(11).fillColor(MUTED).font('Helvetica').text(label, 60, fy);
  doc.fontSize(11).fillColor(color).font('Helvetica-Bold').text(value, W - 180, fy, { align: 'right', width: 130 });
  if (color === TEAL) {
    doc.moveTo(60, fy + 16).lineTo(W - 50, fy + 16).strokeColor(TEAL).lineWidth(0.5).dash(3, { space: 3 }).stroke().undash();
  }
  fy += 22;
});

// Recurring revenue model
doc.fontSize(15).fillColor(DARK).font('Helvetica-Bold')
   .text('Revenus récurrents : les liquides', 40, 255);
doc.moveTo(40, 274).lineTo(190, 274).strokeColor(TEAL).lineWidth(3).stroke();

doc.fontSize(11).fillColor('#4A5568').font('Helvetica')
   .text('Chaque client qui utilise Quitly consomme 1 à 2 liquides par mois en moyenne.\nCes liquides sont revendus dans votre boutique avec une marge attractive.', 40, 285, { width: W - 80 });

// Recurring table
const tableHeaders = ['Liquide / mois', 'Prix vente', 'Prix achat', 'Marge', 'Marge %'];
const tableData = [
  ['1 liquide/mois', '12,00 €', '9,00 €', '3,00 €', '25%'],
  ['1,5 liquide/mois', '18,00 €', '13,50 €', '4,50 €', '25%'],
  ['2 liquides/mois', '24,00 €', '18,00 €', '6,00 €', '25%'],
];

const colWidths = [130, 80, 80, 80, 75];
const tableX = 40;
let tableY = 325;
const rowH = 28;

// Header
doc.rect(tableX, tableY, W - 80, rowH).fill(DARK);
let cx = tableX + 10;
tableHeaders.forEach((h, i) => {
  doc.fontSize(10).fillColor(TEAL).font('Helvetica-Bold').text(h, cx, tableY + 9, { width: colWidths[i] - 5 });
  cx += colWidths[i];
});
tableY += rowH;

tableData.forEach((row, ri) => {
  doc.rect(tableX, tableY, W - 80, rowH).fill(ri % 2 === 0 ? '#F7FAFC' : WHITE);
  cx = tableX + 10;
  row.forEach((cell, ci) => {
    const color = ci === 4 ? TEAL : '#2D3748';
    const fw = ci === 4 ? 'Helvetica-Bold' : 'Helvetica';
    doc.fontSize(10).fillColor(color).font(fw).text(cell, cx, tableY + 9, { width: colWidths[ci] - 5 });
    cx += colWidths[ci];
  });
  tableY += rowH;
});

// LTV block
doc.roundedRect(40, tableY + 20, W - 80, 100, 8).fill('#EBF8F5');
doc.rect(40, tableY + 20, 5, 100).fill(TEAL);

doc.fontSize(14).fillColor(DARK).font('Helvetica-Bold')
   .text('LTV (Lifetime Value) estimée : 216€ / client / an', 60, tableY + 35, { width: W - 100 });
doc.fontSize(11).fillColor('#4A5568').font('Helvetica')
   .text('= 49,40€ (kit) + 18€ × 12 mois (liquides) = 265€ brut annuel par client fidèle', 60, tableY + 58, { width: W - 100 });
doc.fontSize(10).fillColor('#2D8A70').font('Helvetica-Bold')
   .text('Pour 50 clients actifs → 13 250€ de marge brute annuelle estimée', 60, tableY + 80, { width: W - 100 });

tableY += 140;

// Simulation table
doc.fontSize(13).fillColor(DARK).font('Helvetica-Bold')
   .text('Simulation de revenus selon votre réseau', 40, tableY);
doc.moveTo(40, tableY + 18).lineTo(280, tableY + 18).strokeColor(TEAL).lineWidth(3).stroke();

tableY += 28;
const simHeaders = ['Clients actifs', 'CA liquides/mois', 'Marge liquides/mois', 'Marge kit (1 vente/mois)', 'Total marge/mois'];
const simData = [
  ['10 clients', '180 €', '45 €', '49 €', '~94 €'],
  ['25 clients', '450 €', '112 €', '123 €', '~235 €'],
  ['50 clients', '900 €', '225 €', '247 €', '~472 €'],
  ['100 clients', '1 800 €', '450 €', '494 €', '~944 €'],
];
const simColW = [90, 100, 120, 130, 105];
const simRowH = 26;

doc.rect(tableX, tableY, W - 80, simRowH).fill(DARK);
cx = tableX + 8;
simHeaders.forEach((h, i) => {
  doc.fontSize(8.5).fillColor(TEAL).font('Helvetica-Bold').text(h, cx, tableY + 8, { width: simColW[i] - 4 });
  cx += simColW[i];
});
tableY += simRowH;

simData.forEach((row, ri) => {
  doc.rect(tableX, tableY, W - 80, simRowH).fill(ri % 2 === 0 ? '#F7FAFC' : WHITE);
  cx = tableX + 8;
  row.forEach((cell, ci) => {
    const color = ci === 4 ? TEAL : '#2D3748';
    const fw = ci === 4 ? 'Helvetica-Bold' : 'Helvetica';
    doc.fontSize(9).fillColor(color).font(fw).text(cell, cx, tableY + 8, { width: simColW[ci] - 4 });
    cx += simColW[ci];
  });
  tableY += simRowH;
});

doc.fontSize(8).fillColor('#A0AEC0').font('Helvetica')
   .text('Quitly — Confidentiel — Ne pas diffuser sans autorisation', 40, H - 30, { align: 'center', width: W - 80 });

// ─────────────────────────────────────────────
// PAGE 4 — KIT DISTRIBUTEUR & TABLEAU COMPARATIF
// ─────────────────────────────────────────────
doc.addPage();
doc.rect(0, 0, W, H).fill(WHITE);
doc.rect(0, 0, W, 6).fill(TEAL);

doc.rect(0, 6, W, 70).fill(DARK);
doc.fontSize(10).fillColor(TEAL).font('Helvetica-Bold')
   .text('QUITLY', 40, 22, { characterSpacing: 4 });
doc.fontSize(20).fillColor(WHITE).font('Helvetica-Bold')
   .text('Kit Distributeur & Comparatif Marché', 40, 40);

// Kit content
doc.fontSize(15).fillColor(DARK).font('Helvetica-Bold')
   .text('Votre kit de démarrage — Clé en main', 40, 100);
doc.moveTo(40, 120).lineTo(240, 120).strokeColor(TEAL).lineWidth(3).stroke();

const kitItems = [
  { icon: '📦', title: 'Stock initial recommandé', desc: '5 kits Quitly Black Edition + 20 liquides (assortiment 3 saveurs)' },
  { icon: '🖥️', title: 'Support marketing digital', desc: 'Visuels réseaux sociaux HD, bannières web, fiches produit optimisées SEO' },
  { icon: '🎓', title: 'Formation produit', desc: 'Module e-learning 2h : technologie, arguments commerciaux, gestion des objections TPD2' },
  { icon: '📊', title: 'PLV & présentoir', desc: 'Stop-rayon, affiche A2 format paysage, cartes de visite co-brandées Quitly × Votre boutique' },
  { icon: '🤝', title: 'Account manager dédié', desc: 'Interlocuteur unique pour commandes, SAV distributeur, questions réglementaires' },
  { icon: '📱', title: 'Accès partenaire app', desc: 'Dashboard de suivi : ventes, stocks, LTV de votre réseau en temps réel' },
];

let ky = 130;
kitItems.forEach((item, i) => {
  const col = i % 2;
  const row = Math.floor(i / 2);
  const kx = 40 + col * (W / 2 - 20);
  const itemY = ky + row * 72;
  const bw = W / 2 - 55;

  doc.roundedRect(kx, itemY, bw, 62, 6).fill('#F7FAFC');
  doc.rect(kx, itemY, 4, 62).fill(TEAL);
  doc.fontSize(18).text(item.icon, kx + 12, itemY + 10);
  doc.fontSize(10.5).fillColor(DARK).font('Helvetica-Bold').text(item.title, kx + 38, itemY + 10, { width: bw - 48 });
  doc.fontSize(9.5).fillColor('#718096').font('Helvetica').text(item.desc, kx + 38, itemY + 28, { width: bw - 48 });
});

// Comparison table
const compY = ky + 3 * 72 + 30;
doc.fontSize(15).fillColor(DARK).font('Helvetica-Bold')
   .text('Quitly vs Cigarettes Électroniques Classiques', 40, compY);
doc.moveTo(40, compY + 20).lineTo(370, compY + 20).strokeColor(TEAL).lineWidth(3).stroke();

const compHeaders = ['Critère', 'CE Classique', 'Quitly'];
const compData = [
  ['Connectivité', 'Aucune', 'Bluetooth + App IA'],
  ['Suivi consommation', 'Manuel', 'Automatique & temps réel'],
  ['Programme sevrage', 'Non', 'Oui — 26 semaines IA'],
  ['Fidélisation client', 'Faible', 'Forte (app + données)'],
  ['Marge distributeur', '15-25%', '38% kit + 25% liquides'],
  ['Argument commercial', 'Prix bas', 'Résultats mesurables'],
  ['Différenciation', 'Aucune', 'Exclusive (tech. IA)'],
];
const compColW = [155, 145, 155];
const compRowH = 26;
let cy2 = compY + 30;
const ctableX = 40;

doc.rect(ctableX, cy2, W - 80, compRowH).fill(DARK);
let ccx = ctableX + 10;
compHeaders.forEach((h, i) => {
  const col = i === 2 ? TEAL : WHITE;
  doc.fontSize(10).fillColor(col).font('Helvetica-Bold').text(h, ccx, cy2 + 8, { width: compColW[i] - 8 });
  ccx += compColW[i];
});
cy2 += compRowH;

compData.forEach((row, ri) => {
  doc.rect(ctableX, cy2, W - 80, compRowH).fill(ri % 2 === 0 ? '#F7FAFC' : WHITE);
  ccx = ctableX + 10;
  row.forEach((cell, ci) => {
    const isQuitly = ci === 2;
    const isLabel = ci === 0;
    const color = isQuitly ? '#2D8A70' : isLabel ? DARK : '#718096';
    const fw = isQuitly ? 'Helvetica-Bold' : 'Helvetica';
    doc.fontSize(9.5).fillColor(color).font(fw).text(cell, ccx, cy2 + 8, { width: compColW[ci] - 8 });
    ccx += compColW[ci];
  });
  cy2 += compRowH;
});

// Small footer note
doc.fontSize(8).fillColor('#A0AEC0').font('Helvetica')
   .text('Quitly — Confidentiel — Ne pas diffuser sans autorisation', 40, H - 30, { align: 'center', width: W - 80 });

// ─────────────────────────────────────────────
// PAGE 5 — COMMENT DEVENIR DISTRIBUTEUR / CONTACT
// ─────────────────────────────────────────────
doc.addPage();
doc.rect(0, 0, W, H).fill(DARK);
doc.rect(0, 0, W, 6).fill(TEAL);

// Header
doc.fontSize(10).fillColor(TEAL).font('Helvetica-Bold')
   .text('QUITLY', 40, 30, { characterSpacing: 4 });
doc.fontSize(20).fillColor(WHITE).font('Helvetica-Bold')
   .text('Comment Devenir Distributeur', 40, 52);

// Steps
const steps = [
  {
    num: '01',
    title: 'Soumettez votre candidature',
    desc: 'Remplissez le formulaire en ligne sur quitly.fr/distributeurs ou contactez-nous directement par email. Délai de réponse : 48h ouvrées.'
  },
  {
    num: '02',
    title: 'Entretien de qualification',
    desc: 'Échange de 30 min avec notre équipe commerciale pour valider l\'adéquation avec votre réseau, votre zone géographique et vos objectifs.'
  },
  {
    num: '03',
    title: 'Signature du contrat partenaire',
    desc: 'Contrat de distribution exclusif ou non-exclusif selon votre zone. Accès immédiat au portail partenaire et aux ressources marketing.'
  },
  {
    num: '04',
    title: 'Formation & lancement',
    desc: 'Formation produit en ligne (2h). Réception de votre stock de démarrage. Votre compte partenaire activé. Vous êtes prêt à vendre.'
  },
];

let sy = 105;
steps.forEach((step) => {
  // Number circle
  doc.circle(68, sy + 22, 22).fill(TEAL);
  doc.fontSize(16).fillColor(DARK).font('Helvetica-Bold')
     .text(step.num, 56, sy + 14, { width: 26, align: 'center' });
  // Line connector (except last)
  if (step.num !== '04') {
    doc.moveTo(68, sy + 44).lineTo(68, sy + 100).strokeColor(GRAY).lineWidth(2).stroke();
  }
  // Content
  doc.fontSize(13).fillColor(TEAL).font('Helvetica-Bold')
     .text(step.title, 105, sy + 10, { width: W - 155 });
  doc.fontSize(11).fillColor(LIGHT_GRAY).font('Helvetica')
     .text(step.desc, 105, sy + 30, { width: W - 155 });
  sy += 102;
});

// Requirements
doc.roundedRect(40, sy + 10, W - 80, 80, 8).fill(GRAY);
doc.fontSize(12).fillColor(TEAL).font('Helvetica-Bold')
   .text('Prérequis pour devenir partenaire :', 60, sy + 24);
doc.fontSize(10.5).fillColor(LIGHT_GRAY).font('Helvetica')
   .text(
     '• Boutique physique ou e-commerce dans le secteur vapotage / bien-être / pharma / tabac\n• SIRET valide, activité légale en France / Belgique / Suisse\n• Engagement sur un volume minimum de commande mensuel (à définir selon zone)',
     60, sy + 44, { width: W - 120 }
   );

// Contact block
sy += 110;
doc.roundedRect(40, sy, W - 80, 130, 10).fill(TEAL);
doc.fontSize(18).fillColor(DARK).font('Helvetica-Bold')
   .text('Contactez notre équipe partenaires', 60, sy + 20, { width: W - 120, align: 'center' });

doc.fontSize(12).fillColor(DARK).font('Helvetica')
   .text('📧  contact@quitly.fr', 60, sy + 54, { width: W - 120, align: 'center' });
doc.fontSize(12).fillColor(DARK).font('Helvetica')
   .text('🌐  www.quitly.fr/distributeurs', 60, sy + 74, { width: W - 120, align: 'center' });
doc.fontSize(12).fillColor(DARK).font('Helvetica')
   .text('📱  @quitly  (Instagram & TikTok)', 60, sy + 94, { width: W - 120, align: 'center' });

doc.fontSize(10).fillColor('#1A6B58').font('Helvetica-Bold')
   .text('Réponse garantie sous 48h ouvrées', 60, sy + 116, { width: W - 120, align: 'center' });

// Legal footer
doc.fontSize(8).fillColor(MUTED).font('Helvetica')
   .text(
     'Document confidentiel — Usage interne Quitly. La cigarette électronique contient de la nicotine, substance addictive. ' +
     'Vente interdite aux mineurs. Projet fictif à des fins de présentation scolaire.',
     40, H - 45, { width: W - 80, align: 'center' }
   );

doc.moveTo(40, H - 55).lineTo(W - 40, H - 55).strokeColor(GRAY).lineWidth(0.5).stroke();
doc.fontSize(9).fillColor(MUTED).font('Helvetica')
   .text('© 2026 Quitly — Tous droits réservés', 40, H - 30, { align: 'center', width: W - 80 });

doc.end();

console.log('PDF generated successfully at:', outputPath);
