import Link from 'next/link'
import CEDeviceRender from '@/components/ui/CEDeviceRender'

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center px-4">
      <div className="text-3xl sm:text-4xl font-bold mb-1" style={{ color: '#00D4AA' }}>{value}</div>
      <div className="text-sm" style={{ color: '#8A9BAE' }}>{label}</div>
    </div>
  )
}

function Testimonial({ quote, name, age, role }: { quote: string; name: string; age: number; role: string }) {
  return (
    <div className="p-6 rounded-2xl" style={{ backgroundColor: '#1A2430', border: '1px solid #2A3A4A' }}>
      <div className="flex gap-1 mb-4">
        {[1,2,3,4,5].map(i => <span key={i} style={{ color: '#00D4AA' }}>★</span>)}
      </div>
      <p className="text-sm leading-relaxed mb-4 italic" style={{ color: '#E8EDF2' }}>&ldquo;{quote}&rdquo;</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm" style={{ backgroundColor: '#2A3A4A', color: '#00D4AA' }}>
          {name[0]}
        </div>
        <div>
          <div className="text-sm font-semibold" style={{ color: '#E8EDF2' }}>{name}, {age} ans</div>
          <div className="text-xs" style={{ color: '#8A9BAE' }}>{role} · Bêta testeur</div>
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 20% 50%, rgba(0,212,170,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(0,212,170,0.05) 0%, transparent 50%)'
        }} />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Texte */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6" style={{ backgroundColor: 'rgba(0,212,170,0.1)', color: '#00D4AA', border: '1px solid rgba(0,212,170,0.2)' }}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#00D4AA' }} />
                Loquet breveté · IA comportementale · Programme 6 mois
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6" style={{ color: '#E8EDF2' }}>
                La dernière cigarette{' '}
                <span style={{ color: '#00D4AA' }}>que vous utiliserez.</span>
              </h1>

              <p className="text-lg leading-relaxed mb-8" style={{ color: '#8A9BAE' }}>
                Quitly combine une cigarette électronique connectée, un <strong style={{ color: '#E8EDF2' }}>loquet physique breveté</strong> et une <strong style={{ color: '#E8EDF2' }}>IA comportementale</strong> pour vous libérer du tabac en 6 mois — sans volonté de fer.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Link
                  href="/commander"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base transition-all hover:opacity-90 active:scale-95"
                  style={{ backgroundColor: '#00D4AA', color: '#080E14' }}
                >
                  Commander — 130 €
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/programme"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-medium text-base transition-all hover:bg-opacity-80"
                  style={{ backgroundColor: '#1A2430', color: '#E8EDF2', border: '1px solid #2A3A4A' }}
                >
                  Voir le programme
                </Link>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 pt-6 border-t" style={{ borderColor: '#1A2430' }}>
                <StatCard value="6M" label="fumeurs en France" />
                <StatCard value="80%" label="d'échecs classiques" />
                <StatCard value="6 mois" label="vers l'arrêt complet" />
              </div>
            </div>

            {/* Visuel produit */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Halo glow */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full" style={{ background: 'radial-gradient(circle, rgba(0,212,170,0.15) 0%, transparent 70%)' }} />
                </div>
                <CEDeviceRender size={120} className="relative z-10 drop-shadow-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROBLÈME ===== */}
      <section className="py-24" style={{ backgroundColor: '#0D1520' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#E8EDF2' }}>
              8 fumeurs sur 10 échouent.
            </h2>
            <p className="text-xl" style={{ color: '#8A9BAE' }}>
              Pas par manque de volonté — par manque d&apos;outils adaptés.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: '🧠', stat: '80%', label: "des tentatives d'arrêt échouent dans les 6 premiers mois" },
              { icon: '💊', stat: '5×', label: 'le fumeur essaie en moyenne avant de réussir' },
              { icon: '💸', stat: '2 400€', label: "coût annuel moyen d'un fumeur d'un paquet par jour" },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl text-center" style={{ backgroundColor: '#1A2430', border: '1px solid #2A3A4A' }}>
                <div className="text-4xl mb-4">{item.icon}</div>
                <div className="text-3xl font-bold mb-2" style={{ color: '#00D4AA' }}>{item.stat}</div>
                <p className="text-sm" style={{ color: '#8A9BAE' }}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SOLUTION — 3 PHASES ===== */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-4" style={{ backgroundColor: 'rgba(0,212,170,0.1)', color: '#00D4AA', border: '1px solid rgba(0,212,170,0.2)' }}>
              Le programme Quitly
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#E8EDF2' }}>
              3 phases. 6 mois. L&apos;arrêt complet.
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#8A9BAE' }}>
              Un sevrage conçu autour de vous, pas d&apos;un protocole générique.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                phase: '01',
                weeks: 'Semaines 1-2',
                title: 'Observer',
                color: '#00D4AA',
                description: "La CE collecte silencieusement vos habitudes. Fréquence, horaires, moments de craving. Aucune contrainte, aucun jugement.",
                icon: '👁',
              },
              {
                phase: '02',
                weeks: 'Semaines 3-4',
                title: 'Conscientiser',
                color: '#00B8A0',
                description: "L'app vous renvoie vos données comme un miroir. La prise de conscience naturelle de vos patterns tabagiques.",
                icon: '💡',
              },
              {
                phase: '03',
                weeks: 'Semaine 5 → 6 mois',
                title: 'Libérer',
                color: '#009C88',
                description: "Le loquet physique réduit progressivement. -70% en 1 mois. Arrêt complet visé en 6 mois. À votre rythme.",
                icon: '🔓',
              },
            ].map((phase, i) => (
              <div key={i} className="relative p-8 rounded-2xl" style={{ backgroundColor: '#1A2430', border: `1px solid ${phase.color}30` }}>
                <div className="text-5xl font-black mb-4 opacity-10" style={{ color: phase.color }}>{phase.phase}</div>
                <div className="text-xs font-medium mb-2 uppercase tracking-widest" style={{ color: phase.color }}>{phase.weeks}</div>
                <div className="text-2xl mb-2">{phase.icon}</div>
                <h3 className="text-xl font-bold mb-3" style={{ color: '#E8EDF2' }}>{phase.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#8A9BAE' }}>{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRODUIT ===== */}
      <section className="py-24" style={{ backgroundColor: '#0D1520' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex justify-center">
              <CEDeviceRender size={100} />
            </div>
            <div>
              <div className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: '#00D4AA' }}>Quitly Black Edition</div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: '#E8EDF2' }}>
                Le seul dispositif qui combine<br />
                <span style={{ color: '#00D4AA' }}>technologie et sevrage réel</span>
              </h2>
              <div className="space-y-4 mb-8">
                {[
                  { label: 'Loquet physique breveté', desc: 'Contrôle mécanique de votre consommation — impossible à contourner' },
                  { label: 'IA comportementale', desc: 'Certifiée par 2 addictologues — analyse vos patterns en temps réel' },
                  { label: 'Application iOS & Android', desc: 'Programme personnalisé, suivi quotidien, coaching intégré' },
                  { label: 'Bluetooth & USB-C', desc: 'Synchronisation automatique, recharge rapide' },
                ].map((feat, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: 'rgba(0,212,170,0.15)' }}>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#00D4AA' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm font-semibold" style={{ color: '#E8EDF2' }}>{feat.label}</div>
                      <div className="text-xs mt-0.5" style={{ color: '#8A9BAE' }}>{feat.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {['TPD2', 'RoHS', 'CE', 'Bluetooth SIG', 'Brevet FR2024'].map(badge => (
                  <span key={badge} className="text-xs px-2.5 py-1 rounded-md font-mono" style={{ backgroundColor: '#1A2430', color: '#8A9BAE', border: '1px solid #2A3A4A' }}>
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== VALIDATION / TÉMOIGNAGES ===== */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#E8EDF2' }}>
              Validé par des experts, testé par des fumeurs
            </h2>
          </div>

          {/* Stats validation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { value: '80%', label: 'prêts à payer 130€' },
              { value: '2', label: 'addictologues partenaires' },
              { value: '6 mois', label: 'programme complet' },
              { value: '30j', label: 'satisfait ou remboursé' },
            ].map((s, i) => (
              <div key={i} className="text-center p-6 rounded-2xl" style={{ backgroundColor: '#1A2430', border: '1px solid #2A3A4A' }}>
                <div className="text-2xl font-bold mb-1" style={{ color: '#00D4AA' }}>{s.value}</div>
                <div className="text-xs" style={{ color: '#8A9BAE' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Témoignages */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Testimonial
              quote="Après 5 tentatives ratées, Quitly m'a fait comprendre que mon problème était le café du matin. En 3 mois, j'ai réduit de 70%. Le loquet change vraiment tout."
              name="Marc" age={42} role="Cadre, Lyon"
            />
            <Testimonial
              quote="L'app est bluffante. Elle m'a montré que je fumais surtout entre 14h et 16h au bureau. Je n'avais jamais fait le lien avec mon pic de stress."
              name="Sophie" age={35} role="Infirmière, Paris"
            />
            <Testimonial
              quote="J'étais sceptique sur l'IA. Mais les insights sont précis. Et le loquet physique, c'est le truc clé — je ne peux pas tricher avec moi-même."
              name="Thomas" age={28} role="Développeur, Bordeaux"
            />
          </div>

          {/* Expert */}
          <div className="max-w-2xl mx-auto p-8 rounded-2xl text-center" style={{ backgroundColor: '#1A2430', border: '1px solid rgba(0,212,170,0.2)' }}>
            <div className="text-3xl mb-4">🩺</div>
            <blockquote className="text-base italic mb-4" style={{ color: '#E8EDF2' }}>
              &ldquo;L&apos;approche de Quitly est fondée sur les principes de la thérapie comportementale. La réduction progressive couplée à la prise de conscience des déclencheurs est cliniquement validée.&rdquo;
            </blockquote>
            <div className="text-sm font-semibold" style={{ color: '#00D4AA' }}>Dr. Claire Moreau</div>
            <div className="text-xs" style={{ color: '#8A9BAE' }}>Addictologue — CHU de Lyon · Co-développeuse du programme Quitly</div>
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="py-24" style={{ backgroundColor: '#0D1520' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#E8EDF2' }}>
            Commencez votre programme aujourd&apos;hui
          </h2>
          <p className="text-lg mb-8" style={{ color: '#8A9BAE' }}>
            130 € · App incluse à vie · Livraison offerte en France · Satisfait ou remboursé 30 jours
          </p>
          <Link
            href="/commander"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-xl font-bold text-lg transition-all hover:opacity-90 active:scale-95"
            style={{ backgroundColor: '#00D4AA', color: '#080E14' }}
          >
            Commander maintenant — 130 €
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6" style={{ color: '#8A9BAE' }}>
            <span className="flex items-center gap-1.5 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#00D4AA' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8 8-4-4" /></svg>
              Livraison Colissimo 3-5 jours
            </span>
            <span className="flex items-center gap-1.5 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#00D4AA' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8 8-4-4" /></svg>
              SAV sous 48h
            </span>
            <span className="flex items-center gap-1.5 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#00D4AA' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8 8-4-4" /></svg>
              Retour 30 jours
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}
