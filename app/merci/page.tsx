import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Commande confirmée — Quitly' }

export default function MerciPage() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20 px-4">
      <div className="max-w-lg w-full text-center">
        {/* Icône succès */}
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'rgba(0,212,170,0.15)', border: '2px solid rgba(0,212,170,0.4)' }}>
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#00D4AA' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold mb-3" style={{ color: '#E8EDF2' }}>Commande confirmée !</h1>
        <p className="mb-8" style={{ color: '#8A9BAE' }}>
          Un email de confirmation vous a été envoyé. Votre Quitly est en préparation.
        </p>

        {/* Infos pratiques */}
        <div className="p-6 rounded-2xl mb-6 text-left space-y-4" style={{ backgroundColor: '#1A2430', border: '1px solid #2A3A4A' }}>
          <h2 className="font-bold mb-4 text-center" style={{ color: '#E8EDF2' }}>Prochaines étapes</h2>
          {[
            { icon: '📦', title: 'Livraison Colissimo', desc: '3 à 5 jours ouvrés · Un numéro de suivi vous sera envoyé par email' },
            { icon: '📱', title: "Téléchargez l'app", desc: 'Disponible sur App Store et Google Play — cherchez "Quitly"' },
            { icon: '🔧', title: 'SAV disponible', desc: 'Une question ? Réponse sous 48h à contact@quitly.fr' },
          ].map((step, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="text-xl">{step.icon}</span>
              <div>
                <div className="text-sm font-semibold" style={{ color: '#E8EDF2' }}>{step.title}</div>
                <div className="text-xs mt-0.5" style={{ color: '#8A9BAE' }}>{step.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium" style={{ color: '#00D4AA' }}>
          ← Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  )
}
