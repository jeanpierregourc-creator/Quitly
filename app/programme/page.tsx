import type { Metadata } from 'next'
import Link from 'next/link'
import CEDeviceRender from '@/components/ui/CEDeviceRender'
import AnimateOnScroll from '@/components/ui/AnimateOnScroll'

export const metadata: Metadata = {
  title: 'Comment ça marche — Programme sevrage Quitly',
  description: 'Découvrez le programme Quitly en 3 phases : Observer, Conscientiser, Libérer. Loquet breveté + IA comportementale pour arrêter de fumer en 6 mois.',
}

export default function ProgrammePage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative pt-32 pb-20 text-center overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,212,170,0.08) 0%, transparent 60%)' }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
          <AnimateOnScroll delay={0}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-6" style={{ backgroundColor: 'rgba(0,212,170,0.1)', color: '#00D4AA', border: '1px solid rgba(0,212,170,0.2)' }}>
              Certifié par 2 addictologues
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll delay={0.1}>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: '#E8EDF2' }}>
              Un sevrage conçu autour de vous,<br />
              <span style={{ color: '#00D4AA' }}>pas d&apos;un protocole générique.</span>
            </h1>
          </AnimateOnScroll>
          <AnimateOnScroll delay={0.2}>
            <p className="text-xl max-w-2xl mx-auto" style={{ color: '#8A9BAE' }}>
              Quitly analyse vos habitudes, vous les rend visibles, puis réduit progressivement votre consommation via un mécanisme physique breveté.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* 3 PHASES — Timeline verticale */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="relative">
            {/* Ligne verticale centrale */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px hidden md:block" style={{ backgroundColor: '#2A3A4A', transform: 'translateX(-50%)' }} />

            {[
              {
                phase: '01',
                weeks: 'Semaines 1–2',
                title: 'Observer',
                emoji: '👁',
                color: '#00D4AA',
                side: 'left',
                details: [
                  'La CE collecte silencieusement toutes vos bouffées.',
                  'Heure, fréquence, durée, contexte — tout est enregistré.',
                  'Aucune contrainte, aucun changement demandé.',
                  'Vous fumez normalement, Quitly apprend.',
                ],
                quote: '"La plupart des fumeurs ignorent à quel point leur consommation est liée à des déclencheurs précis."',
                quoteAuthor: 'Dr. Claire Moreau, Addictologue',
              },
              {
                phase: '02',
                weeks: 'Semaines 3–4',
                title: 'Conscientiser',
                emoji: '💡',
                color: '#00B8A0',
                side: 'right',
                details: [
                  "L'app vous renvoie vos données comme un miroir.",
                  'Visualisez vos patterns : stress du lundi, pause café...',
                  'Identificiation de vos déclencheurs personnels.',
                  'Objectifs adaptés à votre rythme de vie.',
                ],
                quote: "\"Prendre conscience de ses automatismes, c'est déjà briser 50% de la dépendance comportementale.\"",
                quoteAuthor: 'Dr. Antoine Lefèvre, Psychiatre addictologue',
              },
              {
                phase: '03',
                weeks: 'Semaine 5 → 6 mois',
                title: 'Libérer',
                emoji: '🔓',
                color: '#009C88',
                side: 'left',
                details: [
                  'Le loquet physique active un délai progressif entre les bouffées.',
                  '-70% de consommation en 1 mois.',
                  'Mode urgence : 2-3 taffes autorisées si craving intense.',
                  'Arrêt complet visé à 6 mois.',
                ],
                quote: '"Le loquet Quitly est la première réponse mécanique à la dépendance gestuelle — souvent sous-estimée."',
                quoteAuthor: 'Dr. Claire Moreau, Addictologue',
              },
            ].map((phase, i) => (
              <AnimateOnScroll key={i} delay={i * 0.15}>
                <div className={`relative flex flex-col md:flex-row items-start gap-8 mb-16 ${phase.side === 'right' ? 'md:flex-row-reverse' : ''}`}>
                  {/* Dot central sur la timeline */}
                  <div className="hidden md:flex absolute left-1/2 top-8 -translate-x-1/2 w-12 h-12 rounded-full items-center justify-center z-10 text-lg font-black" style={{ backgroundColor: '#080E14', border: `2px solid ${phase.color}`, color: phase.color }}>
                    {phase.phase}
                  </div>

                  {/* Contenu */}
                  <div className={`flex-1 ${phase.side === 'right' ? 'md:text-right md:pr-20' : 'md:pl-20'}`}>
                    {/* Mobile: numéro visible */}
                    <div className="flex items-center gap-3 mb-4 md:hidden">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm" style={{ backgroundColor: '#080E14', border: `2px solid ${phase.color}`, color: phase.color }}>
                        {phase.phase}
                      </div>
                      <span className="text-xs font-medium uppercase tracking-widest" style={{ color: phase.color }}>{phase.weeks}</span>
                    </div>
                    <div className="hidden md:block text-xs font-medium uppercase tracking-widest mb-2" style={{ color: phase.color }}>{phase.weeks}</div>

                    <div className="text-3xl mb-3">{phase.emoji}</div>
                    <h2 className="text-3xl font-bold mb-4" style={{ color: '#E8EDF2' }}>{phase.title}</h2>

                    <ul className={`space-y-2 mb-6 ${phase.side === 'right' ? 'md:items-end' : ''}`}>
                      {phase.details.map((d, j) => (
                        <li key={j} className={`flex items-start gap-2 ${phase.side === 'right' ? 'md:flex-row-reverse' : ''}`}>
                          <span className="mt-1 flex-shrink-0" style={{ color: phase.color }}>●</span>
                          <span className="text-sm" style={{ color: '#8A9BAE' }}>{d}</span>
                        </li>
                      ))}
                    </ul>

                    <blockquote className="p-4 rounded-xl italic text-sm" style={{ backgroundColor: '#1A2430', borderLeft: `3px solid ${phase.color}`, color: '#E8EDF2' }}>
                      {phase.quote}
                      <footer className="mt-2 text-xs not-italic" style={{ color: '#8A9BAE' }}>— {phase.quoteAuthor}</footer>
                    </blockquote>
                  </div>
                  <div className="hidden md:block flex-1" /> {/* spacer côté opposé */}
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* LOQUET BREVETÉ */}
      <section className="py-20" style={{ backgroundColor: '#0D1520' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimateOnScroll delay={0} direction="left">
              <div>
                <div className="text-xs font-medium uppercase tracking-widest mb-4" style={{ color: '#00D4AA' }}>Innovation brevetée</div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: '#E8EDF2' }}>
                  Le loquet physique :<br />
                  <span style={{ color: '#00D4AA' }}>impossible à ignorer</span>
                </h2>
                <p className="mb-6" style={{ color: '#8A9BAE' }}>
                  Contrairement aux applications qui ne proposent que du contenu, le loquet Quitly agit sur le mécanisme même de la CE. C&apos;est une contrainte physique douce — vous choisissez votre rythme, mais vous ne pouvez pas tricher inconsciemment.
                </p>
                <div className="space-y-4">
                  {[
                    { icon: '⏱', title: 'Pause progressive', desc: 'Le loquet impose un délai croissant entre chaque taffée. De 5 minutes à 30 minutes sur 6 mois.' },
                    { icon: '🆘', title: 'Mode urgence', desc: "2 à 3 taffées autorisées immédiatement en cas de craving intense. L'app enregistre et analyse." },
                    { icon: '📜', title: 'Brevet déposé', desc: 'Mécanisme micro-électronique propriétaire. Aucun concurrent ne propose cette fonctionnalité.' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-xl" style={{ backgroundColor: '#1A2430' }}>
                      <span className="text-2xl">{item.icon}</span>
                      <div>
                        <div className="font-semibold mb-1" style={{ color: '#E8EDF2' }}>{item.title}</div>
                        <div className="text-sm" style={{ color: '#8A9BAE' }}>{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.2} direction="right">
              <div className="flex justify-center">
                <CEDeviceRender size={100} />
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* PERSONA — Marc */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <AnimateOnScroll delay={0}>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4" style={{ color: '#E8EDF2' }}>Une journée avec Quitly</h2>
              <p style={{ color: '#8A9BAE' }}>Marc, 42 ans, cadre lyonnais. 5 tentatives d&apos;arrêt ratées.</p>
            </div>
          </AnimateOnScroll>
          <div className="space-y-4">
            {[
              { time: '07h30', event: 'Réveil', desc: 'Quitly lui montre ses stats de la nuit. Son craving du matin est identifié comme le plus intense.', icon: '🌅', active: true },
              { time: '09h00', event: 'Réunion', desc: "Le loquet bloque pendant 20 min. Marc utilise le mode respiration de l'app. Ça passe.", icon: '💼', active: false },
              { time: '12h30', event: 'Déjeuner', desc: 'Pause déjeuner. Le loquet est en mode libre. Marc choisit de ne pas fumer. Première fois en 15 ans.', icon: '🍽', active: true },
              { time: '16h00', event: 'Pic de stress', desc: "Dossier difficile. Mode urgence activé — 2 taffées. L'app note le contexte pour adapter le programme.", icon: '⚡', active: false },
              { time: '20h00', event: 'Soirée', desc: '-30% vs hier. L\'app envoie un badge "Meilleure journée". Motivation préservée.', icon: '🏆', active: true },
            ].map((item, i) => (
              <AnimateOnScroll key={i} delay={i * 0.08}>
                <div className={`flex gap-4 p-5 rounded-xl transition-all ${item.active ? 'border' : ''}`} style={{ backgroundColor: '#1A2430', borderColor: item.active ? 'rgba(0,212,170,0.3)' : 'transparent' }}>
                  <div className="text-2xl">{item.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-sm font-bold font-mono" style={{ color: '#00D4AA' }}>{item.time}</span>
                      <span className="text-sm font-semibold" style={{ color: '#E8EDF2' }}>{item.event}</span>
                    </div>
                    <p className="text-sm" style={{ color: '#8A9BAE' }}>{item.desc}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center" style={{ backgroundColor: '#0D1520' }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold mb-4" style={{ color: '#E8EDF2' }}>Prêt à commencer votre programme ?</h2>
          <p className="mb-8" style={{ color: '#8A9BAE' }}>130 € · App incluse à vie · Livraison offerte · Remboursé si non satisfait</p>
          <Link href="/commander" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:opacity-90 active:scale-95" style={{ backgroundColor: '#00D4AA', color: '#080E14' }}>
            Commencer mon programme — 130 €
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
      </section>
    </div>
  )
}
