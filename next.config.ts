import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Empêche le MIME sniffing (ex: exécuter un fichier .txt comme JS)
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Empêche l'intégration dans une iframe (protection clickjacking)
          { key: 'X-Frame-Options', value: 'DENY' },
          // Force HTTPS pendant 2 ans, sous-domaines inclus
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          // Contrôle les infos envoyées dans l'en-tête Referer
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Désactive l'accès à la caméra, micro et géolocalisation
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          // Protection XSS navigateurs legacy
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          // Content Security Policy — autorise Next.js inline + Stripe.js
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://js.stripe.com",
              "frame-src https://js.stripe.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "connect-src 'self' https://api.stripe.com",
              "font-src 'self'",
            ].join('; '),
          },
        ],
      },
    ]
  },
}

export default nextConfig
