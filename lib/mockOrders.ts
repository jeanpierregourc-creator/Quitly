export interface MockOrder {
  id: string
  date: string
  status: 'livré' | 'en transit' | 'en préparation'
  statusColor: string
  items: { name: string; qty: number; price: number }[]
  total: number
  tracking?: string
}

export const mockOrders: MockOrder[] = [
  {
    id: 'QTL-2026-0042',
    date: '28 mars 2026',
    status: 'livré',
    statusColor: '#00D4AA',
    items: [
      { name: 'Kit Quitly Black Edition', qty: 1, price: 130 },
      { name: 'Liquide Menthe Glaciale 6mg', qty: 2, price: 12 },
    ],
    total: 154,
    tracking: 'CL123456789FR',
  },
  {
    id: 'QTL-2026-0031',
    date: '10 mars 2026',
    status: 'livré',
    statusColor: '#00D4AA',
    items: [
      { name: 'Liquide Tabac Blond 12mg', qty: 3, price: 12 },
    ],
    total: 36,
    tracking: 'CL987654321FR',
  },
]
