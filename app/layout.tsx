import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import NicotineBanner from '@/components/layout/NicotineBanner'
import AgeGate from '@/components/layout/AgeGate'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Quitly — La dernière cigarette que vous utiliserez.',
    template: '%s | Quitly',
  },
  description: 'Quitly combine une cigarette électronique connectée, un loquet breveté et une IA comportementale pour vous aider à arrêter de fumer en 6 mois.',
  keywords: ['arrêter de fumer', 'sevrage tabac', 'cigarette électronique', 'aide sevrage', 'application sevrage tabac', 'loquet breveté', 'IA comportementale'],
  authors: [{ name: 'Quitly' }],
  creator: 'Quitly',
  metadataBase: new URL('https://quitly.fr'),
  openGraph: {
    title: 'Quitly — La dernière cigarette que vous utiliserez.',
    description: 'Sevrage tabac intelligent en 6 mois. Loquet breveté + IA comportementale + programme personnalisé.',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Quitly',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quitly — La dernière cigarette que vous utiliserez.',
    description: 'Sevrage tabac intelligent en 6 mois.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Quitly",
              "url": "https://quitly.fr",
              "description": "Cigarette électronique connectée avec loquet breveté et IA comportementale pour le sevrage tabagique",
              "email": "contact@quitly.fr",
              "foundingDate": "2026",
              "areaServed": "FR",
              "sameAs": [
                "https://instagram.com/quitly",
                "https://tiktok.com/@quitly"
              ]
            })
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col" style={{ backgroundColor: '#080E14', color: '#E8EDF2' }}>
        <AgeGate />
        <Header />
        <main className="flex-1 pb-12">
          {children}
        </main>
        <Footer />
        <NicotineBanner />
      </body>
    </html>
  )
}
