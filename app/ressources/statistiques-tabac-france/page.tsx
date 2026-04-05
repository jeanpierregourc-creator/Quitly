import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Tabagisme en France : statistiques 2025 — Quitly',
  description: 'Chiffres clés sur le tabagisme en France en 2025 : nombre de fumeurs, taux d\'échec des tentatives d\'arrêt, coûts, méthodes. Sources : Santé Publique France, HAS, OFDT, ANSES.',
  keywords: ['statistiques tabac france', 'chiffres tabagisme', 'fumeurs france 2025', 'sevrage tabac statistiques'],
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Tabagisme en France : statistiques 2025",
  "description": "Données officielles sur le tabagisme en France : prévalence, tentatives d'arrêt, méthodes, coûts sociaux.",
  "datePublished": "2025-01-01",
  "dateModified": "2026-04-01",
  "author": { "@type": "Organization", "name": "Quitly" },
  "publisher": { "@type": "Organization", "name": "Quitly", "url": "https://quitly-eight.vercel.app" },
  "inLanguage": "fr-FR",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [".stat-key", "h1", "h2", ".lead"]
  }
}

const stats = [
  {
    chiffre: "16,4%",
    label: "des Français fument quotidiennement",
    source: "Santé Publique France, Baromètre de santé 2023",
    detail: "Soit environ 6 millions de fumeurs quotidiens en France métropolitaine."
  },
  {
    chiffre: "6 millions",
    label: "de fumeurs quotidiens en France",
    source: "Santé Publique France, 2023",
    detail: "La France compte parmi les pays européens avec la prévalence tabagique la plus élevée chez les 25-45 ans."
  },
  {
    chiffre: "80%",
    label: "des tentatives d'arrêt échouent dans les 6 premiers mois",
    source: "Haute Autorité de Santé (HAS), 2022",
    detail: "La majorité des rechutes surviennent dans les 3 premières semaines, principalement en raison des déclencheurs comportementaux non traités."
  },
  {
    chiffre: "70 000",
    label: "décès annuels liés au tabac en France",
    source: "Institut National du Cancer (INCa), 2023",
    detail: "Le tabac reste la première cause de mortalité évitable en France, devant l'alcool et les accidents de la route."
  },
  {
    chiffre: "2 400 €",
    label: "dépensés par an par un fumeur d'un paquet par jour",
    source: "Calcul sur base du prix moyen du paquet en France, 2024",
    detail: "Sur 6 mois de programme Quitly (130 €), l'économie potentielle dépasse 1 000 € pour un fumeur régulier."
  },
  {
    chiffre: "3,5 millions",
    label: "de Français utilisent la cigarette électronique",
    source: "OFDT, Enquête sur les usages, 2023",
    detail: "Dont 68% déclarent ne pas avoir réussi à arrêter complètement le tabac — principalement à cause de la dépendance comportementale non traitée."
  },
  {
    chiffre: "15 à 25%",
    label: "taux d'abstinence à 6 mois avec substituts nicotiniques seuls",
    source: "Cochrane Review, 2018 — revue de 136 études cliniques",
    detail: "Les substituts nicotiniques traitent la dépendance physique mais pas les automatismes comportementaux, ce qui explique le taux d'échec élevé."
  },
  {
    chiffre: "16 milliards €",
    label: "coût annuel du tabagisme pour la société française",
    source: "OFDT / Observatoire français des drogues, 2019",
    detail: "Ce chiffre inclut les coûts de santé, la perte de productivité et les dépenses de prévention."
  },
]

export default function StatistiquesTabacPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#080E14' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-24">

        {/* Breadcrumb */}
        <nav className="text-xs mb-8" style={{ color: '#8A9BAE' }}>
          <Link href="/" style={{ color: '#8A9BAE' }}>Accueil</Link>
          <span className="mx-2">/</span>
          <span>Ressources</span>
          <span className="mx-2">/</span>
          <span style={{ color: '#E8EDF2' }}>Statistiques tabac France</span>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#00D4AA' }}>
            Données officielles · Mise à jour 2025
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: '#E8EDF2' }}>
            Tabagisme en France : chiffres clés 2025
          </h1>
          <p className="lead text-lg leading-relaxed" style={{ color: '#8A9BAE' }}>
            Le tabagisme reste la première cause de mortalité évitable en France. Ces données proviennent de sources officielles (Santé Publique France, HAS, OFDT, INCa) et sont régulièrement mises à jour pour refléter l&apos;état actuel de la situation.
          </p>
        </header>

        {/* Stats grid */}
        <section className="mb-16">
          <h2 className="text-xl font-bold mb-6" style={{ color: '#E8EDF2' }}>Prévalence et comportements</h2>
          <div className="space-y-4">
            {stats.map((stat, i) => (
              <div key={i} className="p-6 rounded-2xl" style={{ backgroundColor: '#1A2430', border: '1px solid #2A3A4A' }}>
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="stat-key text-3xl font-black flex-shrink-0" style={{ color: '#00D4AA', minWidth: '120px' }}>
                    {stat.chiffre}
                  </div>
                  <div>
                    <p className="font-semibold mb-1" style={{ color: '#E8EDF2' }}>{stat.label}</p>
                    <p className="text-sm mb-2" style={{ color: '#8A9BAE' }}>{stat.detail}</p>
                    <p className="text-xs" style={{ color: '#4A5A6A' }}>Source : {stat.source}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section méthodes */}
        <section className="mb-16">
          <h2 className="text-xl font-bold mb-6" style={{ color: '#E8EDF2' }}>Efficacité des méthodes d&apos;arrêt</h2>
          <div className="p-6 rounded-2xl" style={{ backgroundColor: '#1A2430', border: '1px solid #2A3A4A' }}>
            <dl className="space-y-4">
              <div>
                <dt className="font-semibold text-sm mb-1" style={{ color: '#E8EDF2' }}>Substituts nicotiniques (patchs, gommes)</dt>
                <dd className="text-sm" style={{ color: '#8A9BAE' }}>Taux d&apos;abstinence à 6 mois : 15 à 25% · Source : Cochrane Review, 2018</dd>
              </div>
              <div style={{ borderTop: '1px solid #2A3A4A', paddingTop: '16px' }}>
                <dt className="font-semibold text-sm mb-1" style={{ color: '#E8EDF2' }}>Varénicline (Champix)</dt>
                <dd className="text-sm" style={{ color: '#8A9BAE' }}>Taux d&apos;abstinence à 6 mois : 30 à 35% — effets secondaires fréquents · Source : HAS, 2022</dd>
              </div>
              <div style={{ borderTop: '1px solid #2A3A4A', paddingTop: '16px' }}>
                <dt className="font-semibold text-sm mb-1" style={{ color: '#E8EDF2' }}>Thérapie comportementale et cognitive (TCC)</dt>
                <dd className="text-sm" style={{ color: '#8A9BAE' }}>Recommandée par la HAS en combinaison avec d&apos;autres méthodes · Source : HAS Recommandations, 2014</dd>
              </div>
              <div style={{ borderTop: '1px solid #2A3A4A', paddingTop: '16px' }}>
                <dt className="font-semibold text-sm mb-1" style={{ color: '#E8EDF2' }}>Cigarette électronique seule</dt>
                <dd className="text-sm" style={{ color: '#8A9BAE' }}>68% des vapoteurs n&apos;ont pas réussi à arrêter complètement · Source : OFDT, 2023</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* CTA */}
        <section className="p-8 rounded-2xl text-center" style={{ backgroundColor: '#1A2430', border: '1px solid rgba(0,212,170,0.2)' }}>
          <h2 className="text-xl font-bold mb-3" style={{ color: '#E8EDF2' }}>
            Comment Quitly répond à ces chiffres
          </h2>
          <p className="text-sm mb-6" style={{ color: '#8A9BAE' }}>
            Le dispositif Quitly est conçu pour traiter les deux dimensions de la dépendance : physique (via la réduction progressive de nicotine) et comportementale (via l&apos;IA et le loquet physique breveté). Programme co-développé avec des addictologues.
          </p>
          <Link
            href="/programme"
            className="inline-flex items-center px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90"
            style={{ backgroundColor: '#00D4AA', color: '#080E14' }}
          >
            Découvrir le programme
          </Link>
        </section>

      </div>
    </div>
  )
}
