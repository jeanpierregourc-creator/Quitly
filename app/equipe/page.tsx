import type { Metadata } from 'next'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'

export const metadata: Metadata = {
  title: "L'équipe — Quitly",
  description: "Six profils complémentaires autour d'une vision commune : rendre le sevrage tabagique accessible à tous grâce à la technologie.",
}

const membres = [
  {
    prenom: 'Lila',
    role: 'Vision commerciale et stratégique',
    desc: 'Pilotage global, relations investisseurs, stratégie go-to-market.',
  },
  {
    prenom: 'Timothé',
    role: 'Tech et Hardware',
    desc: 'Capteurs, application mobile, relation usines Shenzhen.',
  },
  {
    prenom: 'Manon R.',
    role: 'Supply chain et Import',
    desc: 'Sécurisation des flux Shenzhen vers Lyon, conformité douanière TPD2.',
  },
  {
    prenom: 'Manon',
    role: 'Brand et E-commerce',
    desc: "Image de marque Quitly, site e-commerce, identité visuelle.",
  },
  {
    prenom: 'Thomas',
    role: 'Développement commercial',
    desc: 'Partenariats vape shops, salons spécialisés, réseaux distributeurs.',
  },
  {
    prenom: 'Sam',
    role: 'Data et Relation client',
    desc: "Amélioration de l'IA, SAV local, retours utilisateurs, NPS.",
  },
]

const experts = [
  {
    nom: 'Dr. Cutarella',
    titre: 'Addictologue',
    citation: "L'approche de Quitly est fondée sur les principes de la thérapie comportementale. La réduction progressive couplée à la prise de conscience des déclencheurs est cliniquement validée.",
  },
  {
    nom: 'Maxime Fevre',
    titre: 'Addictologue partenaire',
    citation: "Prendre conscience de ses automatismes, c'est déjà briser une grande part de la dépendance comportementale. Quitly rend cette prise de conscience possible et mesurable.",
  },
]

export default function EquipePage() {
  return (
    <div>
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,212,170,0.06) 0%, transparent 60%)' }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <AnimateOnScroll delay={0}>
            <p className="text-xs font-medium uppercase tracking-widest mb-6" style={{ color: '#00D4AA' }}>
              Six profils complémentaires
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll delay={0.1}>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: '#E8EDF2' }}>
              Une vision commune.
            </h1>
          </AnimateOnScroll>
          <AnimateOnScroll delay={0.2}>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: '#8A9BAE' }}>
              Quitly est porté par une équipe de six étudiants convaincus que la technologie peut résoudre là où la volonté seule échoue.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {membres.map((m, i) => (
              <AnimateOnScroll key={i} delay={i * 0.08}>
                <div className="p-8 rounded-2xl h-full" style={{ backgroundColor: '#1A2430', border: '1px solid #2A3A4A' }}>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mb-5" style={{ backgroundColor: 'rgba(0,212,170,0.1)', color: '#00D4AA' }}>
                    {m.prenom[0]}
                  </div>
                  <h2 className="text-xl font-bold mb-1" style={{ color: '#E8EDF2' }}>{m.prenom}</h2>
                  <p className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: '#00D4AA' }}>{m.role}</p>
                  <p className="text-sm leading-relaxed" style={{ color: '#8A9BAE' }}>{m.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20" style={{ backgroundColor: '#0D1520' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#E8EDF2' }}>Nos experts médicaux</h2>
            <p style={{ color: '#8A9BAE' }}>Le programme Quitly a été co-développé et validé par 3 professionnels de santé spécialisés en addictologie.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {experts.map((e, i) => (
              <AnimateOnScroll key={i} delay={i * 0.1}>
                <div className="p-8 rounded-2xl" style={{ backgroundColor: '#1A2430', border: '1px solid rgba(0,212,170,0.2)' }}>
                  <div className="font-bold text-lg mb-1" style={{ color: '#E8EDF2' }}>{e.nom}</div>
                  <div className="text-xs font-medium uppercase tracking-widest mb-5" style={{ color: '#00D4AA' }}>{e.titre}</div>
                  <blockquote className="italic text-sm leading-relaxed" style={{ color: '#8A9BAE' }}>
                    &ldquo;{e.citation}&rdquo;
                  </blockquote>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <AnimateOnScroll delay={0}>
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#E8EDF2' }}>Construit à Lyon, pensé pour la France</h2>
            <p className="text-lg leading-relaxed" style={{ color: '#8A9BAE' }}>
              Le dispositif est fabriqué à Shenzhen, stocké et expédié depuis Lyon.
              Nos premiers partenaires distributeurs, la Boîte à Vape (Croix-Rousse) et le Comptoir des Vapes (Lyon 3),
              valident notre approche terrain.
            </p>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  )
}
