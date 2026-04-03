import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Politique de confidentialité — Quitly' }

export default function ConfidentialitePage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-4xl font-bold mb-2" style={{ color: '#E8EDF2' }}>Politique de confidentialité</h1>
        <p className="text-sm mb-10" style={{ color: '#8A9BAE' }}>Dernière mise à jour : avril 2026 — Conforme RGPD</p>
        <div className="space-y-8 text-sm leading-relaxed" style={{ color: '#8A9BAE' }}>
          {[
            { title: '1. Responsable du traitement', content: 'Quitly SAS — contact@quitly.fr\nAdresse : Lyon, France' },
            { title: '2. Données collectées', content: 'Nous collectons :\n• Données de commande : nom, prénom, adresse, email, téléphone\n• Données de compte : email, mot de passe (hashé)\n• Données d\'usage du site : pages visitées, durée de session (via GA4 avec consentement)\n• Données comportementales de l\'appareil : uniquement dans l\'application mobile Quitly' },
            { title: '3. Finalités du traitement', content: 'Vos données sont utilisées pour :\n• Traiter et expédier vos commandes\n• Gérer votre compte client\n• Améliorer le service et l\'expérience utilisateur\n• Envoyer des communications transactionnelles (confirmations, suivi)\n• Améliorer votre programme de sevrage (données comportementales app)' },
            { title: '4. Base légale', content: 'Le traitement de vos données repose sur :\n• L\'exécution du contrat de vente (commandes)\n• Votre consentement (analytics, cookies marketing)\n• L\'intérêt légitime (amélioration du service)' },
            { title: '5. Conservation des données', content: 'Données de commande : 5 ans (obligation comptable)\nDonnées de compte : durée de vie du compte + 3 ans\nDonnées comportementales app : durée du programme + 1 an\nDonnées analytics : 26 mois maximum' },
            { title: '6. Partage des données', content: 'Vos données ne sont JAMAIS vendues. Elles sont partagées uniquement avec :\n• Stripe (paiement) — certifié PCI-DSS\n• Colissimo (livraison)\n• Resend (emails transactionnels)\n• Supabase (hébergement BDD — serveurs EU)\n• Vercel (hébergement site — CDN mondial)' },
            { title: '7. Vos droits', content: 'Conformément au RGPD, vous disposez des droits suivants :\n• Accès à vos données\n• Rectification\n• Suppression ("droit à l\'oubli")\n• Portabilité\n• Opposition au traitement\n\nPour exercer vos droits : contact@quitly.fr' },
            { title: '8. Cookies', content: 'Nous utilisons des cookies pour :\n• Le bon fonctionnement du site (essentiels)\n• L\'analyse d\'audience via Google Analytics 4 (avec votre consentement)\n\nVous pouvez gérer vos préférences via le bandeau cookies au premier accès.' },
          ].map((section, i) => (
            <div key={i}>
              <h2 className="text-base font-bold mb-3" style={{ color: '#E8EDF2' }}>{section.title}</h2>
              <p style={{ whiteSpace: 'pre-line' }}>{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
