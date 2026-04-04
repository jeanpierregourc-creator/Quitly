import { NextRequest, NextResponse } from 'next/server'

/**
 * Rate Limiter — Protection contre le spam et le brute force
 * Limite : 10 requêtes / minute / IP sur toutes les routes /api/*
 */

interface RateLimitEntry {
  count: number
  resetAt: number
}

// Stockage en mémoire (réinitialisé à chaque cold start Vercel — suffisant pour un projet scolaire)
const rateLimitMap = new Map<string, RateLimitEntry>()

const LIMIT = 10          // requêtes max par fenêtre
const WINDOW_MS = 60_000  // fenêtre = 1 minute

function getRateLimitEntry(ip: string): RateLimitEntry {
  const now = Date.now()
  const existing = rateLimitMap.get(ip)

  if (!existing || now > existing.resetAt) {
    // Nouvelle fenêtre
    const entry: RateLimitEntry = { count: 1, resetAt: now + WINDOW_MS }
    rateLimitMap.set(ip, entry)
    return entry
  }

  existing.count++
  return existing
}

// Nettoyage périodique pour éviter les fuites mémoire
function pruneExpiredEntries() {
  const now = Date.now()
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now > entry.resetAt) rateLimitMap.delete(ip)
  }
}

export function proxy(request: NextRequest) {
  // Appliquer le rate limiting uniquement sur les routes API
  if (!request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  // Nettoyer les entrées expirées toutes les 100 requêtes environ
  if (rateLimitMap.size > 100) pruneExpiredEntries()

  // Récupérer l'IP du client (Vercel injecte x-forwarded-for)
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown'

  const entry = getRateLimitEntry(ip)
  const remaining = Math.max(0, LIMIT - entry.count)
  const resetIn = Math.ceil((entry.resetAt - Date.now()) / 1000)

  // Ajouter les headers de rate limit à chaque réponse
  const headers = {
    'X-RateLimit-Limit': String(LIMIT),
    'X-RateLimit-Remaining': String(remaining),
    'X-RateLimit-Reset': String(resetIn),
  }

  if (entry.count > LIMIT) {
    return NextResponse.json(
      {
        error: 'Trop de requêtes. Veuillez réessayer dans quelques instants.',
        retryAfter: resetIn,
      },
      {
        status: 429,
        headers: {
          ...headers,
          'Retry-After': String(resetIn),
        },
      }
    )
  }

  const response = NextResponse.next()
  Object.entries(headers).forEach(([key, value]) => response.headers.set(key, value))
  return response
}

export const config = {
  matcher: ['/api/:path*'],
}
