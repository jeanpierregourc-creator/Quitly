export interface AdminOrder {
  id: string
  date: string
  customer: string
  email: string
  items: string
  total: number
  status: 'livré' | 'en transit' | 'en préparation' | 'remboursé'
}

export interface AdminProduct {
  id: string
  name: string
  type: 'kit' | 'liquid'
  price: number
  stock: number
  active: boolean
}

export interface AdminLead {
  id: string
  date: string
  boutique: string
  contact: string
  email: string
  phone: string
  city: string
}

export interface AdminWaitlist {
  id: string
  date: string
  name: string
  email: string
  source: string
}

export const adminOrders: AdminOrder[] = [
  { id: 'QTL-2026-0042', date: '28 mars 2026', customer: 'Marc Dupont', email: 'marc@example.fr', items: 'Kit Black Edition × 1, Liquide Menthe × 2', total: 154, status: 'livré' },
  { id: 'QTL-2026-0041', date: '26 mars 2026', customer: 'Sophie Martin', email: 'sophie@example.fr', items: 'Kit Black Edition × 1', total: 130, status: 'livré' },
  { id: 'QTL-2026-0040', date: '25 mars 2026', customer: 'Thomas Bernard', email: 'thomas@example.fr', items: 'Kit Black Edition × 1, Liquide Tabac × 1', total: 142, status: 'en transit' },
  { id: 'QTL-2026-0039', date: '22 mars 2026', customer: 'Léa Rousseau', email: 'lea@example.fr', items: 'Liquide Menthe × 3', total: 36, status: 'livré' },
  { id: 'QTL-2026-0038', date: '20 mars 2026', customer: 'Jean-Pierre Moreau', email: 'jp@example.fr', items: 'Kit Black Edition × 1', total: 130, status: 'remboursé' },
  { id: 'QTL-2026-0037', date: '18 mars 2026', customer: 'Camille Lefèvre', email: 'camille@example.fr', items: 'Kit Black Edition × 1, Liquide Fruits × 2', total: 154, status: 'en préparation' },
]

export const adminProducts: AdminProduct[] = [
  { id: 'kit-black', name: 'Kit Quitly Black Edition', type: 'kit', price: 130, stock: 47, active: true },
  { id: 'liquid-menthe', name: 'Liquide Menthe Glaciale 6mg', type: 'liquid', price: 12, stock: 134, active: true },
  { id: 'liquid-tabac', name: 'Liquide Tabac Blond 12mg', type: 'liquid', price: 12, stock: 89, active: true },
  { id: 'liquid-fruits', name: 'Liquide Fruits Rouges 3mg', type: 'liquid', price: 12, stock: 12, active: true },
]

export const adminLeads: AdminLead[] = [
  { id: '1', date: '2 avril 2026', boutique: 'Vape Paradise', contact: 'Antoine Dupuis', email: 'contact@vapeparadise.fr', phone: '06 12 34 56 78', city: 'Lyon' },
  { id: '2', date: '31 mars 2026', boutique: 'Cloud Nine Vape', contact: 'Sarah Legrand', email: 'sarah@cloudnine.fr', phone: '07 23 45 67 89', city: 'Paris' },
  { id: '3', date: '29 mars 2026', boutique: 'Le Vapoteur Bordelais', contact: 'Pierre Lacroix', email: 'pierre@vapobx.fr', phone: '05 56 78 90 12', city: 'Bordeaux' },
  { id: '4', date: '25 mars 2026', boutique: 'Vap&Co Marseille', contact: 'Nadia Benali', email: 'nadia@vapco.fr', phone: '04 91 23 45 67', city: 'Marseille' },
]

export const adminWaitlist: AdminWaitlist[] = [
  { id: '1', date: '3 avril 2026', name: 'François', email: 'francois@example.fr', source: 'commander' },
  { id: '2', date: '3 avril 2026', name: 'Isabelle', email: 'isabelle@example.fr', source: 'commander' },
  { id: '3', date: '2 avril 2026', name: 'Kevin', email: 'kevin@example.fr', source: 'commander' },
  { id: '4', date: '2 avril 2026', name: 'Marie', email: 'marie@example.fr', source: 'commander' },
  { id: '5', date: '1 avril 2026', name: 'Nicolas', email: 'nicolas@example.fr', source: 'commander' },
  { id: '6', date: '1 avril 2026', name: 'Aurélie', email: 'aurelie@example.fr', source: 'commander' },
  { id: '7', date: '31 mars 2026', name: 'Sébastien', email: 'seb@example.fr', source: 'programme' },
  { id: '8', date: '30 mars 2026', name: 'Chloé', email: 'chloe@example.fr', source: 'commander' },
]
