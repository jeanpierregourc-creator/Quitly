import Link from 'next/link'
import CEDeviceRender from '@/components/ui/CEDeviceRender'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'

function Testimonial({ quote, name, age, role }: { quote: string; name: string; age: number; role: string }) {
  return (
    <div className="p-6 rounded-2xl" style={{ backgroundColor: '#1A2430', border: '1px solid #2A3A4A' }}>
      <p className="text-sm leading-relaxed mb-5 italic" style={{ color: '#E8EDF2' }}>&ldquo;{quote}&rdquo;</p>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm" style={{ backgroundColor: '#2A3A4A', color: '#00D4AA' }}>
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
      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 20% 50%, rgba(0,212,170,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(0,212,170,0.05) 0%, transparent 50%)'
        }} />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <AnimateOnScroll delay={0}>
                <p className="text-xs font-medium uppercase tracking-widest mb-6" style={{ color: '#00D4AA' }}>
                  Loquet breveté · IA comportementale · Programme 6 mois
                </p>
              </AnimateOnScroll>

              <AnimateOnScroll delay={0.1}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6" style={{ color: '#E8EDF2' }}>
                  La dernière cigarette{' '}
                  <span style={{ color: '#00D4AA' }}>que vous utiliserez.</span>
                </h1>
              </AnimateOnScroll>

              <AnimateOnScroll delay={0.2}>
                <p className="text-lg leading-relaxed mb-8" style={{ color: '#8A9BAE' }}>
                  Quitly combine une cigarette électronique connectée, un <strong style={{ color: '#E8EDF2' }}>loquet physique breveté</strong> et une <strong style={{ color: '#E8EDF2' }}>IA comportementale</strong> pour vous libérer du tabac en 6 mois, sans volonté de fer.
                </p>
              </AnimateOnScroll>

              <AnimateOnScroll delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                  <Link
                    href="/commander"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-base transition-all hover:opacity-90 active:scale-95"
                    style={{ backgroundColor: '#00D4AA', color: '#080E14' }}
                  >
                    Commander · 130 €
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
              </AnimateOnScroll>

              <AnimateOnScroll delay={0.4}>
                <div className="flex flex-wrap gap-8 pt-6 border-t" style={{ borderColor: '#1A2430' }}>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1" style={{ color: '#00D4AA' }}>6M</div>
                    <div className="text-sm" style={{ color: '#8A9BAE' }}>fumeurs en France</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1" style={{ color: '#00D4AA' }}>80%</div>
                    <div className="text-sm" style={{ color: '#8A9BAE' }}>d&apos;échecs classiques</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-1" style={{ color: '#00D4AA' }}>6 mois</div>
                    <div className="text-sm" style={{ color: '#8A9BAE' }}>vers l&apos;arrêt complet</div>
                  </div>
                </div>
              </AnimateOnScroll>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full" style={{ background: 'radial-gradient(circle, rgba(0,212,170,0.15) 0%, transparent 70%)' }} />
                </div>
                <div className="animate-float">
                  <CEDeviceRender size={120} className="relative z-10 drop-shadow-2xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEME */}
      <section className="py-24" style={{ backgroundColor: '#0D1520' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#E8EDF2' }}>
              8 fumeurs sur 10 échouent.
            </h2>
            <p className="text-xl" style={{ color: '#8A9BAE' }}>
              Pas par manque de volonté, par manque d&apos;outils adaptés.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { stat: '80%', label: "des tentatives d'arrêt échouent dans les 6 premiers mois" },
              { stat: '70%', label: "des vapoteurs restent piégés dans la dépendance à la cigarette électronique" },
              { stat: '2 400 €', label: "coût annuel moyen d'un fumeur d'un paquet par jour" },
            ].map((item, i) => (
              <AnimateOnScroll key={i} delay={i * 0.1}>
                <div className="p-8 rounded-2xl" style={{ backgroundColor: '#1A2430', border: '1px solid #2A3A4A' }}>
                  <div className="text-4xl font-bold mb-3" style={{ color: '#00D4AA' }}>{item.stat}</div>
                  <p className="text-sm leading-relaxed" style={{ color: '#8A9BAE' }}>{item.label}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* 3 PHASES */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: '#00D4AA' }}>Le programme Quitly</p>
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
                num: '01',
                weeks: 'Semaines 1-2',
                title: 'Observer',
                description: "La CE collecte silencieusement vos habitudes. Fréquence, horaires, moments de craving. Aucune contrainte, aucun changement demandé.",
              },
              {
                num: '02',
                weeks: 'Semaines 3-4',
                title: 'Conscientiser',
                description: "L'app vous renvoie vos données comme un miroir. La prise de conscience naturelle de vos patterns tabagiques déclenche la volonté de changer.",
              },
              {
                num: '03',
                weeks: 'Semaine 5 · 6 mois',
                title: 'Libérer',
                description: "Le loquet physique réduit progressivement votre consommation. Arrêt complet visé en 6 mois, à votre rythme.",
              },
            ].map((phase, i) => (
              <AnimateOnScroll key={i} delay={i * 0.15}>
                <div className="relative p-8 rounded-2xl h-full" style={{ backgroundColor: '#1A2430', border: '1px solid rgba(0,212,170,0.15)' }}>
                  <div className="text-6xl font-black mb-6 opacity-10" style={{ color: '#00D4AA' }}>{phase.num}</div>
                  <div className="text-xs font-medium mb-2 uppercase tracking-widest" style={{ color: '#00D4AA' }}>{phase.weeks}</div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: '#E8EDF2' }}>{phase.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#8A9BAE' }}>{phase.description}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUIT */}
      <section className="py-24" style={{ backgroundColor: '#0D1520' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="flex justify-center">
              <CEDeviceRender size={100} />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: '#00D4AA' }}>Quitly Black Edition</p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: '#E8EDF2' }}>
                Le seul dispositif qui combine<br />
                <span style={{ color: '#00D4AA' }}>technologie et sevrage réel</span>
              </h2>
              <div className="space-y-5 mb-8">
                {[
                  { label: 'Loquet physique breveté', desc: 'Contrôle mécanique de votre consommation. Impossible à contourner inconsciemment.' },
                  { label: 'IA comportementale', desc: 'Certifiée par 3 addictologues. Analyse vos patterns et adapte le programme en temps réel.' },
                  { label: 'Application iOS et Android', desc: 'Programme personnalisé, suivi quotidien, coaching intégré.' },
                  { label: 'Bluetooth et USB-C', desc: 'Synchronisation automatique, recharge rapide.' },
                ].map((feat, i) => (
                  <AnimateOnScroll key={i} delay={i * 0.1}>
                    <div className="flex gap-3 items-start">
                      <div className="w-1 h-full min-h-4 flex-shrink-0 mt-1.5 rounded-full" style={{ backgroundColor: '#00D4AA' }} />
                      <div>
                        <div className="text-sm font-semibold mb-0.5" style={{ color: '#E8EDF2' }}>{feat.label}</div>
                        <div className="text-xs leading-relaxed" style={{ color: '#8A9BAE' }}>{feat.desc}</div>
                      </div>
                    </div>
                  </AnimateOnScroll>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {['TPD2', 'RoHS', 'CE', 'Bluetooth SIG', 'Brevet déposé', 'ANSES'].map(badge => (
                  <span key={badge} className="text-xs px-2.5 py-1 rounded-md font-mono" style={{ backgroundColor: '#1A2430', color: '#8A9BAE', border: '1px solid #2A3A4A' }}>
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALIDATION */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#E8EDF2' }}>
              Validé par des experts, testé par des fumeurs
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { value: '80%', label: 'prêts à payer 130 €' },
              { value: '43%', label: 'citent la conscientisation progressive' },
              { value: '3', label: 'addictologues partenaires' },
              { value: '30 j', label: 'satisfait ou remboursé' },
            ].map((s, i) => (
              <div key={i} className="text-center p-6 rounded-2xl" style={{ backgroundColor: '#1A2430', border: '1px solid #2A3A4A' }}>
                <div className="text-2xl font-bold mb-1" style={{ color: '#00D4AA' }}>{s.value}</div>
                <div className="text-xs" style={{ color: '#8A9BAE' }}>{s.label}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { quote: "Après 5 tentatives ratées, Quitly m'a fait comprendre que mon problème était le café du matin. En 3 mois, j'ai réduit de 70%. Le loquet change vraiment tout.", name: "Marc", age: 42, role: "Cadre, Lyon" },
              { quote: "L'app est bluffante. Elle m'a montré que je fumais surtout entre 14h et 16h au bureau. Je n'avais jamais fait le lien avec mon pic de stress.", name: "Sophie", age: 35, role: "Infirmière, Paris" },
              { quote: "J'étais sceptique sur l'IA. Mais les insights sont précis. Et le loquet physique, c'est le truc clé — je ne peux pas tricher avec moi-même.", name: "Thomas", age: 28, role: "Développeur, Bordeaux" },
            ].map((t, i) => (
              <AnimateOnScroll key={i} delay={i * 0.1}>
                <Testimonial quote={t.quote} name={t.name} age={t.age} role={t.role} />
              </AnimateOnScroll>
            ))}
          </div>

          <div className="max-w-2xl mx-auto p-8 rounded-2xl" style={{ backgroundColor: '#1A2430', border: '1px solid rgba(0,212,170,0.2)' }}>
            <blockquote className="text-base italic mb-5" style={{ color: '#E8EDF2' }}>
              &ldquo;L&apos;approche de Quitly est fondée sur les principes de la thérapie comportementale. La réduction progressive couplée à la prise de conscience des déclencheurs est cliniquement validée.&rdquo;
            </blockquote>
            <div className="text-sm font-semibold" style={{ color: '#00D4AA' }}>Dr. Cutarella</div>
            <div className="text-xs mt-1" style={{ color: '#8A9BAE' }}>Addictologue · Co-développeur du programme Quitly</div>
          </div>
        </div>
      </section>

      {/* MARCHE */}
      <section className="py-24" style={{ backgroundColor: '#0D1520' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#E8EDF2' }}>Un marché massif</h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: '#8A9BAE' }}>
              Le marché de la cigarette électronique est en pleine expansion. Quitly se positionne sur le segment à plus forte valeur ajoutée.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { value: '1,1 Md €', label: 'Marché CE France 2024' },
              { value: '28 Md €', label: 'Marché mondial actuel' },
              { value: '60 Md €', label: 'Projection mondiale 2030' },
            ].map((s, i) => (
              <AnimateOnScroll key={i} delay={i * 0.1}>
                <div className="p-8 rounded-2xl text-center" style={{ backgroundColor: '#1A2430', border: '1px solid #2A3A4A' }}>
                  <div className="text-3xl font-bold mb-2" style={{ color: '#00D4AA' }}>{s.value}</div>
                  <div className="text-sm" style={{ color: '#8A9BAE' }}>{s.label}</div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24">
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
            Commander maintenant · 130 €
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm" style={{ color: '#8A9BAE' }}>
            <span>Livraison Colissimo 3-5 jours</span>
            <span style={{ color: '#2A3A4A' }}>·</span>
            <span>SAV sous 48h</span>
            <span style={{ color: '#2A3A4A' }}>·</span>
            <span>Retour 30 jours</span>
          </div>
        </div>
      </section>
    </div>
  )
}
