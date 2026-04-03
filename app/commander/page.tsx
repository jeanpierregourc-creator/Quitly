import type { Metadata } from 'next'
import CEDeviceRender from '@/components/ui/CEDeviceRender'
import ShopSection from '@/components/shop/ShopSection'

export const metadata: Metadata = {
  title: 'Commander — Kit Quitly Black Edition 130€',
  description: 'Commandez votre kit Quitly : cigarette électronique connectée + loquet breveté + app IA à vie. 130€ TTC, livraison offerte en France, satisfait ou remboursé 30 jours.',
}

export default function CommanderPage() {
  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Titre */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-4" style={{ backgroundColor: 'rgba(0,212,170,0.1)', color: '#00D4AA', border: '1px solid rgba(0,212,170,0.2)' }}>
            🇫🇷 Livraison offerte en France
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold" style={{ color: '#E8EDF2' }}>
            Commander <span style={{ color: '#00D4AA' }}>Quitly</span>
          </h1>
        </div>

        {/* Layout principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Colonne gauche — Produit */}
          <div className="space-y-6">
            {/* Kit principal */}
            <div className="p-6 rounded-2xl" style={{ backgroundColor: '#1A2430', border: '2px solid rgba(0,212,170,0.3)' }}>
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0">
                  <CEDeviceRender size={60} />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-medium uppercase tracking-widest mb-1" style={{ color: '#00D4AA' }}>Kit complet</div>
                  <h2 className="text-xl font-bold mb-1" style={{ color: '#E8EDF2' }}>Quitly — Black Edition</h2>
                  <p className="text-sm mb-3" style={{ color: '#8A9BAE' }}>Programme sevrage 6 mois · App incluse à vie</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black" style={{ color: '#00D4AA' }}>130 €</span>
                    <span className="text-sm" style={{ color: '#8A9BAE' }}>TTC</span>
                  </div>
                </div>
              </div>

              {/* Contenu du kit */}
              <div className="space-y-2 mb-6">
                {[
                  'CE connectée Bluetooth 5.0 + loquet breveté',
                  '1 liquide starter inclus (au choix)',
                  'Application iOS & Android — à vie',
                  'Programme IA personnalisé 6 mois',
                  'Guide de démarrage & accès SAV prioritaire',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#00D4AA' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    <span style={{ color: '#E8EDF2' }}>{item}</span>
                  </div>
                ))}
              </div>

              {/* Badges conformité */}
              <div className="flex flex-wrap gap-2 pt-4 border-t" style={{ borderColor: '#2A3A4A' }}>
                {['TPD2', 'RoHS', 'CE', 'Bluetooth SIG', 'Brevet FR2024'].map(b => (
                  <span key={b} className="text-xs px-2 py-0.5 rounded font-mono" style={{ backgroundColor: '#0D1520', color: '#8A9BAE', border: '1px solid #2A3A4A' }}>{b}</span>
                ))}
              </div>
            </div>

            {/* Liquides supplémentaires */}
            <div>
              <h3 className="text-sm font-semibold mb-3 uppercase tracking-widest" style={{ color: '#8A9BAE' }}>Liquides supplémentaires</h3>
              <div className="space-y-3">
                {[
                  { name: 'Liquide Menthe Glaciale', mg: '6mg · 10ml', price: '12 €', color: '#00D4AA' },
                  { name: 'Liquide Tabac Blond', mg: '12mg · 10ml', price: '12 €', color: '#B8860B' },
                  { name: 'Liquide Fruits Rouges', mg: '3mg · 10ml', price: '12 €', color: '#DC143C' },
                ].map((liquid, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl" style={{ backgroundColor: '#1A2430', border: '1px solid #2A3A4A' }}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full" style={{ backgroundColor: liquid.color + '20', border: `1px solid ${liquid.color}40` }} />
                      <div>
                        <div className="text-sm font-medium" style={{ color: '#E8EDF2' }}>{liquid.name}</div>
                        <div className="text-xs" style={{ color: '#8A9BAE' }}>{liquid.mg}</div>
                      </div>
                    </div>
                    <span className="text-sm font-bold" style={{ color: '#00D4AA' }}>{liquid.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Garanties */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: '🚚', label: 'Livraison', sub: '3-5 jours Colissimo' },
                { icon: '🔄', label: '30 jours', sub: 'Satisfait ou remboursé' },
                { icon: '💬', label: 'SAV 48h', sub: 'Réponse garantie' },
              ].map((g, i) => (
                <div key={i} className="p-3 rounded-xl text-center" style={{ backgroundColor: '#1A2430', border: '1px solid #2A3A4A' }}>
                  <div className="text-xl mb-1">{g.icon}</div>
                  <div className="text-xs font-semibold" style={{ color: '#E8EDF2' }}>{g.label}</div>
                  <div className="text-xs" style={{ color: '#8A9BAE' }}>{g.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Colonne droite — Formulaire de commande */}
          <div className="lg:sticky lg:top-24">
            <ShopSection />
          </div>
        </div>

        {/* Témoignages rapides */}
        <div className="mt-16 pt-16 border-t" style={{ borderColor: '#1A2430' }}>
          <h3 className="text-xl font-bold text-center mb-8" style={{ color: '#E8EDF2' }}>Ce que disent nos bêta-testeurs</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { text: '"Enfin une aide au sevrage qui ne me culpabilise pas. Le loquet change tout."', name: 'Marc, 42 ans', stars: 5 },
              { text: '"L\'app m\'a montré que je fumais par ennui, pas par besoin. Révélateur."', name: 'Sophie, 35 ans', stars: 5 },
              { text: '"En 2 mois, -60% de conso. Je n\'aurais pas cru ça possible."', name: 'Thomas, 28 ans', stars: 5 },
            ].map((t, i) => (
              <div key={i} className="p-5 rounded-xl" style={{ backgroundColor: '#1A2430', border: '1px solid #2A3A4A' }}>
                <div className="flex gap-0.5 mb-3">
                  {Array(t.stars).fill(0).map((_, j) => <span key={j} style={{ color: '#00D4AA' }}>★</span>)}
                </div>
                <p className="text-sm italic mb-3" style={{ color: '#E8EDF2' }}>{t.text}</p>
                <p className="text-xs" style={{ color: '#8A9BAE' }}>{t.name} · Bêta testeur</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
