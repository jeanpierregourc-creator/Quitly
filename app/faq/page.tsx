import type { Metadata } from 'next'
import FAQAccordion from '@/components/faq/FAQAccordion'

export const metadata: Metadata = {
  title: 'FAQ — Questions fréquentes Quitly',
  description: 'Toutes les réponses sur le produit Quitly, le programme de sevrage, la commande, la livraison et la réglementation TPD2.',
}

const faqData = [
  {
    category: 'Le produit',
    icon: '📦',
    questions: [
      { q: 'Comment fonctionne le loquet physique ?', a: "Le loquet Quitly est un mécanisme micro-électronique intégré dans la CE. Il communique avec l'application via Bluetooth et impose un délai progressif entre chaque utilisation. En phase 3, ce délai augmente graduellement selon votre programme personnalisé. Un mode urgence permet 2-3 taffées immédiates si nécessaire." },
      { q: "Qu'est-ce que l'IA comportementale ?", a: "L'IA Quitly analyse vos patterns de consommation (heure, fréquence, durée, contexte) et identifie vos déclencheurs personnels. Elle adapte votre programme de réduction en temps réel, en tenant compte de votre rythme de vie et de vos progrès. Elle a été développée en collaboration avec 2 addictologues." },
      { q: "Quelle est l'autonomie de la batterie ?", a: "La batterie de la Quitly Black Edition offre une autonomie de 8 à 12 heures selon l'utilisation. La recharge via USB-C prend environ 45 minutes. Un indicateur LED sur le dispositif signale le niveau de charge." },
      { q: "Quitly est-il compatible avec n'importe quel liquide ?", a: "Quitly est optimisé pour fonctionner avec les liquides Quitly, spécialement formulés pour le programme de sevrage. Il est compatible avec les liquides TPD2 standard, mais certaines fonctionnalités avancées nécessitent les liquides officiels." },
    ],
  },
  {
    category: 'Le programme',
    icon: '📋',
    questions: [
      { q: 'Combien de temps dure le programme ?', a: "Le programme complet dure 6 mois. Phase 1 (Observer) : 2 semaines. Phase 2 (Conscientiser) : 2 semaines. Phase 3 (Libérer) : 5 mois. La durée peut varier selon votre niveau de dépendance et vos progrès." },
      { q: 'Est-ce que ça marche vraiment ?', a: "En phase bêta, 80% des testeurs ont déclaré être prêts à recommander Quitly. La réduction progressive de la consommation est cliniquement validée. Cependant, comme pour toute aide au sevrage, les résultats varient selon les individus. La garantie satisfait ou remboursé 30 jours vous permet de tester sans risque." },
      { q: "Que se passe-t-il après 6 mois ?", a: "Après 6 mois, l'objectif est l'arrêt complet. Si vous n'êtes pas encore prêt, le programme peut être prolongé. L'application reste accessible à vie — vos données et insights vous appartiennent pour toujours." },
      { q: 'Puis-je utiliser Quitly si je fume peu ?', a: "Quitly est conçu pour tous les profils de fumeurs. L'IA adapte le programme selon votre consommation initiale. Que vous fumiez 5 ou 30 cigarettes par jour, le programme s'ajuste à votre rythme." },
    ],
  },
  {
    category: 'La commande',
    icon: '🛒',
    questions: [
      { q: 'Quel est le délai de livraison ?', a: "Livraison par Colissimo en 3 à 5 jours ouvrés en France métropolitaine. Des délais légèrement plus longs peuvent s'appliquer pour la Corse, les DOM-TOM, la Belgique et la Suisse. Un numéro de suivi vous est envoyé par email dès l'expédition." },
      { q: 'Puis-je me faire rembourser ?', a: "Oui. Quitly offre une garantie satisfait ou remboursé de 30 jours à compter de la réception. Si vous n'êtes pas satisfait pour quelque raison que ce soit, contactez-nous via le formulaire de retour. Le remboursement est traité sous 5 à 7 jours ouvrés." },
      { q: 'Comment contacter le SAV ?', a: "Notre service client répond sous 48h ouvrées à contact@quitly.fr. Vous pouvez aussi utiliser le formulaire disponible dans votre espace client. Pour les urgences techniques, un chat est disponible sur l'application mobile." },
      { q: "Est-ce que la commande inclut les liquides ?", a: "Le kit Quitly à 130 € inclut la CE connectée + 1 flacon de liquide starter + l'application à vie. Des liquides supplémentaires sont disponibles à l'achat séparément dans la boutique." },
    ],
  },
  {
    category: 'Technique',
    icon: '⚙️',
    questions: [
      { q: "L'app est-elle compatible iPhone et Android ?", a: "L'application Quitly est disponible sur iOS 14+ (iPhone 6s et ultérieur) et Android 8.0+. La connexion Bluetooth 5.0 est requise, présente sur tous les smartphones depuis 2018." },
      { q: 'Comment mettre à jour le firmware ?', a: "Les mises à jour du firmware sont automatiques via l'application. Assurez-vous que votre CE est chargée et connectée en Bluetooth lors de la mise à jour (environ 2 minutes)." },
    ],
  },
  {
    category: 'Santé',
    icon: '🩺',
    questions: [
      { q: 'Quitly est-il validé médicalement ?', a: "Le programme Quitly a été co-développé avec le Dr. Claire Moreau et le Dr. Antoine Lefèvre, addictologues au CHU de Lyon. Il s'appuie sur des protocoles de thérapie comportementale cliniquement validés. Quitly n'est pas un médicament et ne remplace pas un suivi médical." },
      { q: 'Y a-t-il de la nicotine dans les liquides ?', a: "Oui. Les liquides Quitly contiennent de la nicotine (disponibles en plusieurs dosages : 3mg, 6mg, 12mg). La réduction progressive via le loquet permet de diminuer l'exposition à la nicotine de façon contrôlée. La cigarette électronique contient de la nicotine, substance addictive." },
    ],
  },
  {
    category: 'Réglementation',
    icon: '📜',
    questions: [
      { q: 'Quitly est-il conforme TPD2 ?', a: "Oui. Quitly est conforme à la Directive sur les Produits du Tabac (TPD2) de l'Union Européenne. Tous les liquides sont conformes et enregistrés auprès des autorités compétentes. Le dispositif porte les certifications CE, RoHS et Bluetooth SIG." },
      { q: "Puis-je l'utiliser dans les espaces publics ?", a: "L'usage de la cigarette électronique est soumis aux mêmes restrictions que la cigarette traditionnelle dans certains lieux. Elle est interdite dans les établissements scolaires, les transports en commun et peut être réglementée dans d'autres espaces. Renseignez-vous auprès des gestionnaires des lieux." },
    ],
  },
]

export default function FAQPage() {
  return (
    <div>
      {/* Hero */}
      <section className="pt-32 pb-16 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: '#E8EDF2' }}>
            Questions <span style={{ color: '#00D4AA' }}>fréquentes</span>
          </h1>
          <p className="text-xl" style={{ color: '#8A9BAE' }}>
            Tout ce que vous devez savoir sur Quitly, le programme, la commande et la réglementation.
          </p>
        </div>
      </section>

      {/* FAQ Accordéon */}
      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <FAQAccordion data={faqData} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center" style={{ backgroundColor: '#0D1520' }}>
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <p className="text-lg mb-2" style={{ color: '#E8EDF2' }}>Vous n&apos;avez pas trouvé votre réponse ?</p>
          <p className="mb-6" style={{ color: '#8A9BAE' }}>Notre équipe répond sous 48h ouvrées.</p>
          <a href="mailto:contact@quitly.fr" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all hover:opacity-90" style={{ backgroundColor: '#1A2430', color: '#00D4AA', border: '1px solid rgba(0,212,170,0.3)' }}>
            Contacter le support
          </a>
        </div>
      </section>
    </div>
  )
}
