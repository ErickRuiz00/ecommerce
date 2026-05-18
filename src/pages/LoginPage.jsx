import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login, loading } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    const { ok, error: err } = await login(email, password)
    if (ok) {
      navigate('/shop')
    } else {
      setError(err || 'Credenciales incorrectas')
    }
  }

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col items-center justify-center relative overflow-hidden font-body-md">
      <main className="relative z-10 w-full max-w-[420px] px-8">
        {/* Brand */}
        <header className="text-center mb-stack-lg">
          <h1 className="font-display-lg-mobile text-display-lg-mobile text-primary tracking-tighter mb-unit">
            E-COMMERCE
          </h1>
        </header>

        {/* Form */}
        <div className="p-8 rounded-xl md:px-10">
          <form className="space-y-stack-md" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="space-y-unit">
              <label
                className="block font-label-md text-label-md text-on-surface-variant px-unit"
                htmlFor="email"
              >
                Correo Electrónico
              </label>
              <div
                className="flex items-center px-4 py-3 rounded-lg bg-surface-container-high"
                style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}
              >
                <span className="material-symbols-outlined mr-3 text-[20px] text-on-surface">
                  mail
                </span>
                <input
                  id="email"
                  type="email"
                  placeholder="nombre@ejemplo.com"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent border-none focus:ring-0 w-full text-on-surface font-body-md placeholder:text-on-surface-variant"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-unit">
              <div className="flex justify-between items-center px-unit">
                <label
                  className="block font-label-md text-label-md text-on-surface-variant"
                  htmlFor="password"
                >
                  Contraseña
                </label>
              </div>
              <div
                className="flex items-center px-4 py-3 rounded-lg bg-surface-container-high"
                style={{ border: '1px solid rgba(0, 0, 0, 0.1)' }}
              >
                <span className="material-symbols-outlined mr-3 text-[20px] text-on-surface">
                  lock
                </span>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-transparent border-none focus:ring-0 w-full text-on-surface font-body-md placeholder:text-on-surface-variant"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="focus:outline-none"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  <span className="material-symbols-outlined cursor-pointer hover:text-primary transition-colors text-on-surface">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="font-label-sm text-label-sm text-error px-unit">{error}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-container text-on-primary-container py-4 rounded-lg font-headline-sm text-headline-sm transition-all duration-300 active:scale-95 hover:shadow-[0_0_15px_rgba(98,54,255,0.4)] mt-4 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && (
                <span className="material-symbols-outlined animate-spin text-[18px]">
                  progress_activity
                </span>
              )}
              Iniciar Sesión
            </button>
          </form>
        </div>

        {/* Footer */}
        <footer className="mt-stack-lg text-center">
          <p className="font-body-md text-on-surface-variant">
            ¿No tienes una cuenta?{' '}
            <Link className="text-primary font-semibold hover:underline" to="/register">
              Regístrate ahora
            </Link>
          </p>
        </footer>
      </main>
    </div>
  )
}
