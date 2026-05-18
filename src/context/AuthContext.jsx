import { createContext, useContext, useState } from 'react'
import { api } from '../services/api'

// ── Mock credentials (remove when backend is live) ───────────────────────────
const MOCK_EMAIL    = 'test@demo.com'
const MOCK_PASSWORD = 'test123'
const MOCK_TOKEN    = 'mock-token-demo'
const MOCK_USER = {
  id: 1,
  nombre: 'Usuario',
  apellidoPaterno: 'Demo',
  apellidoMaterno: 'Test',
  email: MOCK_EMAIL,
  phone: '55 1234 5678',
  birthDate: '1995-06-15',
  gender: 'hombre',
  avatar: null,
}

function isMockSession() {
  return localStorage.getItem('auth_token') === MOCK_TOKEN
}
// ─────────────────────────────────────────────────────────────────────────────

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)

  async function login(email, password) {
    setLoading(true)
    try {
      if (email === MOCK_EMAIL && password === MOCK_PASSWORD) {
        await new Promise((r) => setTimeout(r, 600))
        localStorage.setItem('auth_token', MOCK_TOKEN)
        setUser(MOCK_USER)
        return { ok: true }
      }
      const { token, user: userData } = await api.login(email, password)
      localStorage.setItem('auth_token', token)
      setUser(userData)
      return { ok: true }
    } catch (err) {
      return { ok: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  async function register(data) {
    setLoading(true)
    try {
      if (data.email === MOCK_EMAIL) {
        await new Promise((r) => setTimeout(r, 600))
        return { ok: true }
      }
      await api.register(data)
      return { ok: true }
    } catch (err) {
      return { ok: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  async function logout() {
    await api.logout()
    setUser(null)
  }

  async function updateProfile(data) {
    setLoading(true)
    try {
      if (isMockSession()) {
        await new Promise((r) => setTimeout(r, 600))
        const entries = Object.fromEntries(data instanceof FormData ? data.entries() : Object.entries(data))
        setUser((prev) => ({ ...prev, ...entries, avatar: prev?.avatar ?? null }))
        return { ok: true }
      }
      const updated = await api.updateProfile(data)
      setUser(updated)
      return { ok: true }
    } catch (err) {
      return { ok: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
