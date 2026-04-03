import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Notre équipe — Quitly',
  description: "Découvrez l'équipe Quitly : 6 étudiants lyonnais et 2 addictologues partenaires qui ont créé le programme de sevrage le plus innovant du marché.",
}

const team = [
  { name: 'Timothé C.', role: 'CEO & Co-fondateur', bio: 'Vision produit et stratégie commerciale. Passionné par la santé digitale et l\'impact social.', initials: 'TC', emoji: '🎯' },
  { name: 'Alexandre M.', role: 'CTO & Co-fondateur', bio: 'Architecture système et développement de l\'IA comportementale. Expert en embedded systems.', initials: 'AM', emoji: '⚙️' },
  { name: 'Léa D.', role: 'CMO & Co-fondatrice', bio: 'Stratégie marketing et acquisition. Spécialisée en growth et communication santé.', initials: 'LD', emoji: '📣' },
  { name: 'Hugo B.', role: 'Lead Design', bio: 'UX/UI et design produit. Obsédé par les interfaces qui changent les comportements.', initials: 'HB', emoji: '✏️' },
  { name: 'Camille R.', role: 'Data & IA', bio: 'Modèles d\'analyse comportementale et pipeline de données. Double compétence médecine et data science.', initials: 'CR', emoji: '🧠' },
  { name: 'Julien P.', role: 'Hardware & Brevets', bio: 'Ingénieur mécatronique. Concepteur du loquet breveté — la pièce maîtresse de Quitly.', initials: 'JP', emoji: '🔩' },
]

const experts = [
  {
    name: 'Dr. Claire Moreau',
    title: 'Addictologue — CHU de Lyon',
    quote: "L'approche de Quitly est fondée sur les principes de la thérapie comportementale. La réduction progressive couplée à la prise de conscience des déclencheurs est cliniquement validée et représente une avancée réelle dans l'aide au sevrage.",
    expertise: ['Tabacologie', 'Thérapie comportementale', 'Addictions comportementales'],
  },
  {
    name: 'Dr. Antoine Lefèvre',
    title: 'Psychiatre addictologue — Université Claude Bernard Lyon 1',
    quote: "Prendre conscience de ses automatismes, c'est briser 50% de la dépendance comportementale. Quitly rend cette prise de conscience possible et mesurable pour la première fois grâce aux données collectées par le dispositif.",
    expertise: ['Psychiatrie addictologique', 'Dépendances nicotiniques', 'Protocoles de sevrage'],
  },
]

export default function EquipePage() {
  return (
    <div>
      {/* Hero */}
      <section className="pt-32 pb-16 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: '#E8EDF2' }}>
            L&apos;équipe <span style={{ color: '#00D4AA' }}>Quitly</span>
          </h1>
          <p className="text-xl" style={{ color: '#8A9BAE' }}>
            6 étudiants lyonnais, 2 addictologues, et une conviction commune : arrêter de fumer ne devrait pas dépendre de la volonté.
          </p>
        </div>
      </section>

      {/* Notre histoire */}
      <section className="py-16" style={{ backgroundColor: '#0D1520' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: '#00D4AA' }}>Notre histoire</div>
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#E8EDF2' }}>Pourquoi Quitly existe</h2>
              <div className="space-y-4 text-sm leading-relaxed" style={{ color: '#8A9BAE' }}>
                <p>Tout est parti d&apos;un constat simple : les solutions existantes demandent aux fumeurs de changer par la <em>volonté</em>. Patchs, applications, hypnose — toutes présupposent une motivation constante.</p>
                <p>Chez Quitly, nous avons compris que <strong style={{ color: '#E8EDF2' }}>la dépendance au tabac est avant tout comportementale</strong>. Ce n&apos;est pas une question de manque de volonté — c&apos;est une question de déclencheurs inconscients.</p>
                <p>En travaillant avec des addictologues du CHU de Lyon, nous avons conçu un système qui observe, comprend, puis agit — sans jamais forcer.</p>
                <p>Quitly se positionne délibérément <strong style={{ color: '#E8EDF2' }}>contre Enovap et les CE classiques</strong> qui remplacent la cigarette sans traiter la dépendance. Notre objectif est l&apos;arrêt complet, pas la substitution indéfinie.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '6M', label: 'fumeurs en France' },
                { value: '80%', label: 'd\'échecs classiques' },
                { value: '2', label: 'addictologues partenaires' },
                { value: '1', label: 'brevet déposé' },
              ].map((s, i) => (
                <div key={i} className="p-6 rounded-2xl text-center" style={{ backgroundColor: '#1A2430', border: '1px solid #2A3A4A' }}>
                  <div className="text-3xl font-bold mb-1" style={{ color: '#00D4AA' }}>{s.value}</div>
                  <div className="text-xs" style={{ color: '#8A9BAE' }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Équipe */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold mb-12 text-center" style={{ color: '#E8EDF2' }}>L&apos;équipe fondatrice</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, i) => (
              <div key={i} className="p-6 rounded-2xl" style={{ backgroundColor: '#1A2430', border: '1px solid #2A3A4A' }}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-black" style={{ backgroundColor: 'rgba(0,212,170,0.15)', color: '#00D4AA', border: '2px solid rgba(0,212,170,0.3)' }}>
                    {member.emoji}
                  </div>
                  <div>
                    <div className="font-bold" style={{ color: '#E8EDF2' }}>{member.name}</div>
                    <div className="text-xs font-medium" style={{ color: '#00D4AA' }}>{member.role}</div>
                  </div>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: '#8A9BAE' }}>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experts */}
      <section className="py-20" style={{ backgroundColor: '#0D1520' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold mb-4 text-center" style={{ color: '#E8EDF2' }}>Nos experts médicaux</h2>
          <p className="text-center mb-12" style={{ color: '#8A9BAE' }}>Le programme Quitly a été co-développé et validé par des professionnels de santé spécialisés en addictologie.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {experts.map((expert, i) => (
              <div key={i} className="p-8 rounded-2xl" style={{ backgroundColor: '#1A2430', border: '1px solid rgba(0,212,170,0.2)' }}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl" style={{ backgroundColor: 'rgba(0,212,170,0.1)', border: '2px solid rgba(0,212,170,0.3)' }}>
                    🩺
                  </div>
                  <div>
                    <div className="font-bold text-lg" style={{ color: '#E8EDF2' }}>{expert.name}</div>
                    <div className="text-sm" style={{ color: '#00D4AA' }}>{expert.title}</div>
                  </div>
                </div>
                <blockquote className="italic text-sm leading-relaxed mb-6" style={{ color: '#E8EDF2' }}>
                  &ldquo;{expert.quote}&rdquo;
                </blockquote>
                <div className="flex flex-wrap gap-2">
                  {expert.expertise.map((tag, j) => (
                    <span key={j} className="text-xs px-2.5 py-1 rounded-full" style={{ backgroundColor: 'rgba(0,212,170,0.1)', color: '#00D4AA', border: '1px solid rgba(0,212,170,0.2)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold mb-12 text-center" style={{ color: '#E8EDF2' }}>Nos valeurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🔬', title: 'Innovation responsable', desc: 'Nous ne créons pas de technologie pour la technologie. Chaque fonctionnalité de Quitly a une finalité médicale claire.' },
              { icon: '🎯', title: 'Sevrage sans contrainte', desc: 'Notre approche est douce et progressive. Nous guidons, nous n\'imposons pas. Vous restez maître de votre parcours.' },
              { icon: '🔒', title: 'Data au service de l\'humain', desc: 'Vos données comportementales vous appartiennent. Elles ne sont jamais revendues et uniquement utilisées pour améliorer votre programme.' },
            ].map((val, i) => (
              <div key={i} className="p-6 rounded-2xl text-center" style={{ backgroundColor: '#1A2430', border: '1px solid #2A3A4A' }}>
                <div className="text-4xl mb-4">{val.icon}</div>
                <h3 className="font-bold mb-3" style={{ color: '#E8EDF2' }}>{val.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#8A9BAE' }}>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Presse V1 placeholder */}
      <section className="py-16 text-center" style={{ backgroundColor: '#0D1520' }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="p-8 rounded-2xl" style={{ backgroundColor: '#1A2430', border: '1px solid #2A3A4A' }}>
            <div className="text-3xl mb-3">📰</div>
            <h3 className="font-bold mb-2" style={{ color: '#E8EDF2' }}>Presse & Awards</h3>
            <p className="text-sm" style={{ color: '#8A9BAE' }}>À venir — nous contacter pour les demandes presse.</p>
            <a href="mailto:presse@quitly.fr" className="inline-block mt-4 text-sm font-medium" style={{ color: '#00D4AA' }}>presse@quitly.fr</a>
          </div>
        </div>
      </section>
    </div>
  )
}
