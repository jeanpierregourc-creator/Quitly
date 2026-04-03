import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Conditions Générales de Vente — Quitly' }

export default function CGVPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-4xl font-bold mb-2" style={{ color: '#E8EDF2' }}>Conditions Générales de Vente</h1>
        <p className="text-sm mb-10" style={{ color: '#8A9BAE' }}>Version 1.0 — Avril 2026</p>
        <div className="space-y-8 text-sm leading-relaxed" style={{ color: '#8A9BAE' }}>
          {[
            { title: 'Article 1 — Objet', content: 'Les présentes Conditions Générales de Vente (CGV) régissent les ventes effectuées par Quitly SAS via le site quitly.fr. Tout achat implique l\'acceptation pleine et entière des présentes CGV.' },
            { title: 'Article 2 — Produits', content: 'Quitly propose la vente du kit Quitly Black Edition (cigarette électronique connectée + loquet breveté + application mobile) ainsi que des liquides compatibles. Les produits sont conformes à la réglementation TPD2.' },
            { title: 'Article 3 — Prix', content: 'Les prix sont indiqués en euros TTC (TVA 20% incluse). Quitly se réserve le droit de modifier ses prix à tout moment. Les commandes sont facturées au prix en vigueur au moment de la validation.' },
            { title: 'Article 4 — Commande', content: 'La commande est validée après confirmation du paiement par Stripe. Un email de confirmation est envoyé dans les minutes suivant la validation. Quitly se réserve le droit de refuser toute commande en cas de suspicion de fraude.' },
            { title: 'Article 5 — Paiement', content: 'Le paiement est sécurisé par Stripe (certifié PCI-DSS). Les moyens de paiement acceptés sont : Visa, Mastercard, American Express. Le montant est débité immédiatement à la validation de la commande.' },
            { title: 'Article 6 — Livraison', content: 'Livraison par Colissimo en France métropolitaine (offerte), Belgique, Suisse et DOM-TOM (tarif applicable). Délai : 3 à 5 jours ouvrés. Un numéro de suivi est communiqué par email dès l\'expédition.' },
            { title: 'Article 7 — Droit de rétractation', content: 'Conformément à l\'article L.221-18 du Code de la consommation, vous disposez d\'un délai de 30 jours à compter de la réception pour exercer votre droit de rétractation, sans justification. Le remboursement est effectué dans les 5 à 7 jours ouvrés via le mode de paiement initial.' },
            { title: 'Article 8 — Garanties', content: 'Le dispositif Quitly bénéficie d\'une garantie légale de conformité de 2 ans et d\'une garantie commerciale de 1 an. En cas de défaut, contactez le SAV à contact@quitly.fr.' },
            { title: 'Article 9 — Données personnelles', content: 'Les données collectées lors de la commande (nom, adresse, email) sont traitées conformément à notre Politique de Confidentialité et au RGPD. Elles ne sont pas revendues à des tiers.' },
            { title: 'Article 10 — Droit applicable', content: 'Les présentes CGV sont soumises au droit français. En cas de litige, les tribunaux de Lyon sont compétents.' },
          ].map((article, i) => (
            <div key={i}>
              <h2 className="text-base font-bold mb-3" style={{ color: '#E8EDF2' }}>{article.title}</h2>
              <p>{article.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
