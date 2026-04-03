import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Mentions légales — Quitly' }

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-4xl font-bold mb-2" style={{ color: '#E8EDF2' }}>Mentions légales</h1>
        <p className="text-sm mb-10" style={{ color: '#8A9BAE' }}>Dernière mise à jour : avril 2026</p>
        <div className="space-y-8 text-sm leading-relaxed" style={{ color: '#8A9BAE' }}>
          {[
            { title: 'Éditeur du site', content: 'Quitly SAS — Société par Actions Simplifiée au capital de 1 000 €\nSiège social : Lyon, France\nRCS : En cours d\'immatriculation\nDirecteur de la publication : Timothé C.\nEmail : contact@quitly.fr' },
            { title: 'Hébergement', content: 'Vercel Inc.\n340 Pine Street, Suite 900\nSan Francisco, CA 94104, USA\nhttps://vercel.com' },
            { title: 'Propriété intellectuelle', content: 'L\'ensemble du contenu de ce site (textes, images, vidéos, logos, icônes) est protégé par le droit d\'auteur. Toute reproduction, même partielle, est interdite sans autorisation expresse de Quitly SAS.' },
            { title: 'Données personnelles', content: 'Conformément au RGPD et à la loi Informatique et Libertés, vous disposez d\'un droit d\'accès, de rectification et de suppression de vos données. Contactez-nous à : contact@quitly.fr\n\nDélégué à la Protection des Données : contact@quitly.fr' },
            { title: 'Avertissement santé', content: 'La cigarette électronique contient de la nicotine, substance addictive. Elle est réservée aux fumeurs adultes. Tenez hors de portée des enfants et des adolescents. Non recommandé aux femmes enceintes.' },
            { title: 'Conformité réglementaire', content: 'Les produits Quitly sont conformes à la Directive 2014/40/UE relative aux produits du tabac et produits connexes (TPD2). Tous les liquides contenant de la nicotine sont enregistrés auprès des autorités compétentes.' },
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
