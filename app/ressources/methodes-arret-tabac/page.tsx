import type { Metadata } from 'next'
import Link from 'next/link'
import ShareButton from '@/components/ui/ShareButton'

export const metadata: Metadata = {
  title: 'Les méthodes pour arrêter de fumer : comparatif 2025 — Quitly',
  description: 'Comparatif objectif des méthodes pour arrêter de fumer : patchs nicotiniques, varénicline, TCC, hypnose, cigarette électronique. Taux de réussite, coûts, pour qui.',
  keywords: ['méthode arrêter de fumer', 'comment arrêter de fumer', 'sevrage tabac méthode', 'comparatif sevrage tabac', 'meilleure méthode arrêt tabac'],
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Les méthodes pour arrêter de fumer : comparatif 2025",
  "description": "Comparatif objectif et sourcé des principales méthodes de sevrage tabagique disponibles en France.",
  "datePublished": "2025-01-01",
  "dateModified": "2026-04-01",
  "author": { "@type": "Organization", "name": "Quitly" },
  "publisher": { "@type": "Organization", "name": "Quitly", "url": "https://quitly-eight.vercel.app" },
  "inLanguage": "fr-FR",
  "about": {
    "@type": "MedicalCondition",
    "name": "Tabagisme",
    "alternateName": "Dépendance au tabac"
  },
  "reviewedBy": {
    "@type": "Person",
    "name": "Dr. Cutarella",
    "jobTitle": "Addictologue"
  },
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [".method-summary", "h1", "h2", ".lead"]
  }
}

const methodes = [
  {
    nom: "Substituts nicotiniques",
    exemples: "Patchs, gommes, pastilles, inhaleurs",
    tauxReussite: "15 à 25%",
    duree: "8 à 12 semaines",
    cout: "Partiellement remboursé (SS)",
    pourQui: "Fumeurs motivés avec dépendance physique modérée",
    avantages: "Accessible sans ordonnance, remboursé, peu d'effets secondaires",
    limites: "Ne traite pas la dépendance comportementale",
    source: "Cochrane Review, 2018"
  },
  {
    nom: "Varénicline (Champix)",
    exemples: "Médicament sur ordonnance",
    tauxReussite: "30 à 35%",
    duree: "12 semaines",
    cout: "Remboursé sur prescription",
    pourQui: "Fumeurs avec forte dépendance physique, suivi médical actif",
    avantages: "Taux de réussite supérieur aux substituts nicotiniques",
    limites: "Effets secondaires possibles (nausées, troubles du sommeil, idées noires rares)",
    source: "HAS, 2022"
  },
  {
    nom: "Thérapie comportementale (TCC)",
    exemples: "Séances avec psychologue ou addictologue",
    tauxReussite: "20 à 30% (en combinaison)",
    duree: "3 à 6 mois",
    cout: "Non remboursé hors parcours spécialisé",
    pourQui: "Fumeurs avec forte composante comportementale, anxiété, stress",
    avantages: "Traite les automatismes, durable dans le temps",
    limites: "Coût élevé, disponibilité limitée des praticiens",
    source: "HAS Recommandations, 2014"
  },
  {
    nom: "Hypnose",
    exemples: "Séances avec hypnothérapeute",
    tauxReussite: "Insuffisamment documenté",
    duree: "1 à 5 séances",
    cout: "Non remboursé — 60 à 120 € / séance",
    pourQui: "Fumeurs réceptifs à la suggestion, dépendance psychologique forte",
    avantages: "Pas d'effets secondaires, résultats rapides pour certains profils",
    limites: "Peu de preuves scientifiques robustes",
    source: "ANSES, revue de littérature 2021"
  },
  {
    nom: "Cigarette électronique classique",
    exemples: "CE du commerce sans programme structuré",
    tauxReussite: "12 à 18%",
    duree: "Variable",
    cout: "30 à 100 € / mois",
    pourQui: "Fumeurs cherchant une transition progressive, sans accompagnement",
    avantages: "Réduction des risques reconnue par l'ANSES, geste préservé",
    limites: "68% des vapoteurs n'arrêtent pas complètement (OFDT, 2023)",
    source: "ANSES, rapport 2021"
  },
  {
    nom: "Quitly",
    exemples: "CE connectée + loquet breveté + IA comportementale",
    tauxReussite: "Données en cours de collecte (bêta)",
    duree: "6 mois",
    cout: "130 € (kit complet)",
    pourQui: "Fumeurs voulant traiter les deux dimensions de la dépendance simultanément",
    avantages: "Traite dépendance physique ET comportementale, programme structuré avec addictologues",
    limites: "Nécessite smartphone, produit nouveau",
    source: "Programme co-développé avec le Dr. Cutarella et Maxime Fevre, addictologues"
  },
]

export default function MethodesArretTabacPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#080E14' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-24">

        {/* Breadcrumb */}
        <nav className="text-xs mb-8" style={{ color: '#8A9BAE' }}>
          <Link href="/" style={{ color: '#8A9BAE' }}>Accueil</Link>
          <span className="mx-2">/</span>
          <span>Ressources</span>
          <span className="mx-2">/</span>
          <span style={{ color: '#E8EDF2' }}>Méthodes pour arrêter de fumer</span>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#00D4AA' }}>
            Comparatif objectif · Sources officielles
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: '#E8EDF2' }}>
            Les méthodes pour arrêter de fumer : comparatif 2025
          </h1>
          <p className="lead text-lg leading-relaxed mb-4" style={{ color: '#8A9BAE' }}>
            Il n&apos;existe pas de méthode universelle pour arrêter de fumer. L&apos;efficacité dépend du profil du fumeur, du niveau de dépendance physique et comportementale, et de l&apos;accompagnement disponible. Ce comparatif présente les données disponibles pour chaque méthode, avec leurs sources.
          </p>
          <p className="method-summary text-sm p-4 rounded-xl" style={{ backgroundColor: '#1A2430', color: '#8A9BAE', border: '1px solid #2A3A4A' }}>
            <strong style={{ color: '#E8EDF2' }}>Point clé :</strong> Selon la HAS (2022), 80% des tentatives d&apos;arrêt échouent dans les 6 premiers mois. La principale cause est la dépendance comportementale — les automatismes liés aux situations (café, stress, repas) — que les substituts nicotiniques seuls ne traitent pas.
          </p>
        </header>

        {/* Tableau comparatif */}
        <section className="mb-16">
          <h2 className="text-xl font-bold mb-6" style={{ color: '#E8EDF2' }}>Comparatif des méthodes</h2>
          <div className="space-y-4">
            {methodes.map((m, i) => (
              <div key={i} className={`p-6 rounded-2xl ${m.nom === 'Quitly' ? 'ring-1' : ''}`}
                style={{
                  backgroundColor: '#1A2430',
                  border: m.nom === 'Quitly' ? '1px solid rgba(0,212,170,0.4)' : '1px solid #2A3A4A'
                }}>
                <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
                  <h3 className="font-bold text-base" style={{ color: m.nom === 'Quitly' ? '#00D4AA' : '#E8EDF2' }}>
                    {m.nom}
                  </h3>
                  <span className="text-xs px-2.5 py-1 rounded font-mono" style={{ backgroundColor: '#0D1520', color: '#00D4AA' }}>
                    {m.tauxReussite} de réussite
                  </span>
                </div>
                <p className="text-xs mb-3" style={{ color: '#8A9BAE' }}>{m.exemples}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3 text-xs">
                  <div>
                    <span style={{ color: '#4A5A6A' }}>Durée</span>
                    <p style={{ color: '#E8EDF2' }}>{m.duree}</p>
                  </div>
                  <div>
                    <span style={{ color: '#4A5A6A' }}>Coût</span>
                    <p style={{ color: '#E8EDF2' }}>{m.cout}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <span style={{ color: '#4A5A6A' }}>Pour qui</span>
                    <p style={{ color: '#E8EDF2' }}>{m.pourQui}</p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-2 text-xs">
                  <p style={{ color: '#8A9BAE' }}><span style={{ color: '#00D4AA' }}>+</span> {m.avantages}</p>
                  <p style={{ color: '#8A9BAE' }}><span style={{ color: '#EF4444' }}>—</span> {m.limites}</p>
                </div>
                <p className="text-xs mt-3" style={{ color: '#4A5A6A' }}>Source : {m.source}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section dépendance comportementale */}
        <section className="mb-16">
          <h2 className="text-xl font-bold mb-4" style={{ color: '#E8EDF2' }}>
            Pourquoi la dépendance comportementale est souvent négligée
          </h2>
          <div className="p-6 rounded-2xl" style={{ backgroundColor: '#1A2430', border: '1px solid #2A3A4A' }}>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#8A9BAE' }}>
              La dépendance au tabac a deux composantes. La dépendance <strong style={{ color: '#E8EDF2' }}>physique</strong> à la nicotine est celle que traitent les patchs et médicaments. La dépendance <strong style={{ color: '#E8EDF2' }}>comportementale</strong> — les automatismes associés à des situations précises (première cigarette avec le café, pause cigarette au travail, cigarette en conduisant) — est rarement adressée.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: '#8A9BAE' }}>
              La Haute Autorité de Santé recommande la Thérapie Cognitive et Comportementale (TCC) en complément des substituts nicotiniques précisément pour traiter ces automatismes. Le programme Quitly intègre ces principes directement dans le dispositif, sans nécessiter de suivi psychologique séparé.
            </p>
          </div>
        </section>

        {/* Partager */}
        <div className="flex justify-center mb-8">
          <ShareButton
            title="Les méthodes pour arrêter de fumer : comparatif 2025"
            text="Comparatif objectif des méthodes de sevrage tabac — taux de réussite, coûts, pour qui"
            url="https://quitly-eight.vercel.app/ressources/methodes-arret-tabac"
          />
        </div>

        {/* CTA */}
        <section className="p-8 rounded-2xl text-center" style={{ backgroundColor: '#1A2430', border: '1px solid rgba(0,212,170,0.2)' }}>
          <h2 className="text-xl font-bold mb-3" style={{ color: '#E8EDF2' }}>Découvrir l&apos;approche Quitly</h2>
          <p className="text-sm mb-6" style={{ color: '#8A9BAE' }}>
            Loquet physique breveté + IA comportementale + programme 6 mois co-développé avec des addictologues. 130 € TTC, livraison offerte, satisfait ou remboursé 30 jours.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/programme" className="inline-flex items-center px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90" style={{ backgroundColor: '#00D4AA', color: '#080E14' }}>
              Le programme en détail
            </Link>
            <Link href="/ressources/statistiques-tabac-france" className="inline-flex items-center px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:opacity-90" style={{ backgroundColor: '#1A2430', color: '#E8EDF2', border: '1px solid #2A3A4A' }}>
              Statistiques tabac France
            </Link>
          </div>
        </section>

      </div>
    </div>
  )
}
