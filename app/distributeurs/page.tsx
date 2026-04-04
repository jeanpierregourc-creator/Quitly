import type { Metadata } from 'next'
import DistributeurForm from '@/components/distributeurs/DistributeurForm'

export const metadata: Metadata = {
  title: 'Distributeurs — Référencer Quitly dans votre boutique',
  description: '38% de marge sur le dispositif, 18€ récurrents par client actif. Devenez distributeur Quitly et ouvrez votre boutique à une nouvelle clientèle.',
}

export default function DistributeursPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,212,170,0.06) 0%, transparent 60%)' }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6" style={{ backgroundColor: 'rgba(0,212,170,0.1)', color: '#00D4AA', border: '1px solid rgba(0,212,170,0.2)' }}>
            Programme partenaires — V1
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: '#E8EDF2' }}>
            Référencer Quitly :<br />
            <span style={{ color: '#00D4AA' }}>une nouvelle clientèle, des revenus récurrents.</span>
          </h1>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: '#8A9BAE' }}>
            6 millions de fumeurs cherchent à arrêter — ils ne vont pas aujourd&apos;hui en boutique vape. Quitly change ça.
          </p>
        </div>
      </section>

      {/* Arguments financiers */}
      <section className="py-20" style={{ backgroundColor: '#0D1520' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: '#E8EDF2' }}>Pourquoi référencer Quitly ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '💰',
                value: '38%',
                label: 'Marge sur le dispositif',
                desc: '80 € prix distributeur / 130 € prix public. La meilleure marge du marché vape premium.',
              },
              {
                icon: '🔄',
                value: '18 €',
                label: 'Récurrents / mois / client',
                desc: 'Chaque client actif génère des revenus mensuels via les consommables. Fidélisation garantie par le programme.',
              },
              {
                icon: '📈',
                value: '216 €',
                label: 'LTV annuelle par client',
                desc: 'Valeur vie client annuelle par utilisateur fidélisé. Un retour sur investissement exceptionnel.',
              },
            ].map((arg, i) => (
              <div key={i} className="p-8 rounded-2xl text-center" style={{ backgroundColor: '#1A2430', border: '1px solid rgba(0,212,170,0.2)' }}>
                <div className="text-4xl mb-4">{arg.icon}</div>
                <div className="text-4xl font-black mb-1" style={{ color: '#00D4AA' }}>{arg.value}</div>
                <div className="font-semibold mb-3" style={{ color: '#E8EDF2' }}>{arg.label}</div>
                <p className="text-sm" style={{ color: '#8A9BAE' }}>{arg.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nouvelle cible + Kit */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="p-8 rounded-2xl" style={{ backgroundColor: '#1A2430', border: '1px solid #2A3A4A' }}>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#E8EDF2' }}>Une clientèle entièrement nouvelle</h3>
              <p className="mb-4" style={{ color: '#8A9BAE' }}>
                Vos clients actuels sont des vapoteurs. Les clients Quitly sont des <strong style={{ color: '#E8EDF2' }}>fumeurs qui veulent arrêter</strong>, ils ne viennent pas chez vous aujourd&apos;hui.
              </p>
              <p style={{ color: '#8A9BAE' }}>
                Référencer Quitly, c&apos;est ouvrir votre boutique à un marché de <strong style={{ color: '#E8EDF2' }}>6 millions de personnes</strong> qui cherchent activement une solution.
              </p>
            </div>
            <div className="p-8 rounded-2xl" style={{ backgroundColor: '#1A2430', border: '1px solid #2A3A4A' }}>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#E8EDF2' }}>Kit partenaire complet</h3>
              <ul className="space-y-3">
                {[
                  'Pitch vendeur + formation produit',
                  'QR code dédié à votre boutique (tracking)',
                  'SAV géré par Quitly, 48h de réponse garantie',
                  'Stock en consignation disponible',
                  'Support marketing (PLV, affiches, fiches produit)',
                  'Liquides fournis par Moonshiners, notre partenaire fabricant',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#00D4AA' }} />
                    <span style={{ color: '#E8EDF2' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tableau comparatif */}
      <section className="py-20" style={{ backgroundColor: '#0D1520' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: '#E8EDF2' }}>Quitly vs CE classique</h2>
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #2A3A4A' }}>
            <div className="grid grid-cols-3 text-xs font-semibold uppercase tracking-widest" style={{ backgroundColor: '#2A3A4A' }}>
              <div className="p-4" style={{ color: '#8A9BAE' }}>Critère</div>
              <div className="p-4 text-center" style={{ color: '#00D4AA' }}>Quitly</div>
              <div className="p-4 text-center" style={{ color: '#8A9BAE' }}>CE classique</div>
            </div>
            {[
              ['Marge distributeur', '38%', '15-20%'],
              ['LTV client / an', '216 €', '~60 €'],
              ['Récurrence achats', 'Mensuelle (programme)', 'Occasionnelle'],
              ['Fidélisation client', '6 mois garantis', 'Faible'],
              ['Image boutique', 'Santé & innovation', 'Standard'],
              ['SAV géré par', 'Quitly (48h)', 'Vous'],
            ].map(([crit, quitly, classic], i) => (
              <div key={i} className="grid grid-cols-3 border-t" style={{ borderColor: '#2A3A4A', backgroundColor: i % 2 === 0 ? '#1A2430' : '#141E28' }}>
                <div className="p-4 text-sm" style={{ color: '#8A9BAE' }}>{crit}</div>
                <div className="p-4 text-sm text-center font-semibold" style={{ color: '#00D4AA' }}>{quitly}</div>
                <div className="p-4 text-sm text-center" style={{ color: '#8A9BAE' }}>{classic}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulaire contact */}
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center mb-4" style={{ color: '#E8EDF2' }}>Devenir distributeur</h2>
          <p className="text-center mb-10" style={{ color: '#8A9BAE' }}>
            Remplissez le formulaire ci-dessous. Notre équipe vous répond sous 48h avec une proposition commerciale.
          </p>
          <DistributeurForm />
          <div className="mt-8 text-center">
            <p className="text-sm mb-2" style={{ color: '#8A9BAE' }}>Ou téléchargez directement notre plaquette :</p>
            <a href="/documents/plaquette-distributeur.pdf" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all hover:opacity-80" style={{ backgroundColor: '#1A2430', color: '#00D4AA', border: '1px solid rgba(0,212,170,0.3)' }}>
              📥 Télécharger la plaquette distributeur (PDF)
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
