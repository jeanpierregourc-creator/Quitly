export interface QuitlyUser {
  name: string
  email: string
  createdAt: string
}

export function getUser(): QuitlyUser | null {
  if (typeof window === 'undefined') return null
  const data = localStorage.getItem('quitly_user')
  return data ? JSON.parse(data) : null
}

export function signIn(email: string, password: string): QuitlyUser | null {
  // Simulation : tout mot de passe de 6+ caractères est accepté
  if (!email || password.length < 6) return null
  const name = email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1)
  const user: QuitlyUser = { name, email, createdAt: new Date().toISOString() }
  localStorage.setItem('quitly_user', JSON.stringify(user))
  return user
}

export function signUp(name: string, email: string, password: string): QuitlyUser | null {
  if (!name || !email || password.length < 6) return null
  const user: QuitlyUser = { name, email, createdAt: new Date().toISOString() }
  localStorage.setItem('quitly_user', JSON.stringify(user))
  return user
}

export function signOut(): void {
  localStorage.removeItem('quitly_user')
}
