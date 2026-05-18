import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const AVATAR_PLACEHOLDER =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCNFIkgkfr7wQ_3QnVCNk8QoQaJZNbjwO_XZDRpt-KYgitgxDLNCJov1DsPXYRgjOuTsLKhxPa7aRfGeaRDlNNRmZjTpazqjlvvpWoLet-OZ-g7mON10nV5yv_dMGzP85f_-czSCIoC0I8Rgmb4ksSCwnkzZUkPU3G5zo3ldC5wHVDGl6LvHBIr7NPzLTC3YQGuTqucS8UOB2JJm7QkzPyA9hkEcGKdi289Hh3dB7c4OspcttD1wkcvp_rEZWrqHsw0fguyKB-G5jYQ'

const GENDERS = [
  { value: 'hombre', label: 'Hombre', icon: 'male' },
  { value: 'mujer', label: 'Mujer', icon: 'female' },
]

export default function ProfilePage() {
  const navigate = useNavigate()
  const { user, updateProfile, loading } = useAuth()
  const fileInputRef = useRef(null)

  const [avatarPreview, setAvatarPreview] = useState(user?.avatar ?? null)
  const [avatarFile, setAvatarFile] = useState(null)
  const [nombre, setNombre] = useState(user?.nombre ?? '')
  const [apellidoPaterno, setApellidoPaterno] = useState(user?.apellidoPaterno ?? '')
  const [apellidoMaterno, setApellidoMaterno] = useState(user?.apellidoMaterno ?? '')
  const [email, setEmail] = useState(user?.email ?? '')
  const [password, setPassword] = useState('')
  const [birthDate, setBirthDate] = useState(user?.birthDate ?? '')
  const [phone, setPhone] = useState(user?.phone ?? '')
  const [gender, setGender] = useState(user?.gender ?? '')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)

  function handleAvatarChange(e) {
    const file = e.target.files?.[0]
    if (file) {
      setAvatarFile(file)
      setAvatarPreview(URL.createObjectURL(file))
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    const payload = new FormData()
    payload.append('nombre', nombre)
    payload.append('apellidoPaterno', apellidoPaterno)
    payload.append('apellidoMaterno', apellidoMaterno)
    payload.append('email', email)
    if (password) payload.append('password', password)
    payload.append('birthDate', birthDate)
    payload.append('phone', phone)
    payload.append('gender', gender)
    if (avatarFile) payload.append('avatar', avatarFile)

    const { ok, error: err } = await updateProfile(payload)
    if (ok) {
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } else {
      setError(err || 'Error al guardar los cambios')
    }
  }

  return (
    <div className="bg-background font-body-md text-on-background min-h-screen overflow-x-hidden">
      <div className="fixed -bottom-20 -left-20 w-64 h-64 bg-primary-container/5 rounded-full blur-[100px] -z-10" />
      <div className="fixed -top-20 -right-20 w-64 h-64 bg-secondary-container/10 rounded-full blur-[100px] -z-10" />

      {/* Top App Bar */}
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/10 shadow-sm">
        <div className="flex items-center justify-between px-margin-mobile h-16 w-full max-w-7xl mx-auto">
          <button type="button" onClick={() => navigate(-1)}
            className="text-primary active:scale-95 duration-200 hover:opacity-80 transition-opacity" aria-label="Regresar">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="font-headline-md text-headline-md font-bold tracking-tight text-primary">Mi Perfil</h1>
          <div className="w-6" />
        </div>
      </header>

      <main className="pt-24 pb-stack-lg px-margin-mobile max-w-xl mx-auto">
        <div className="mb-stack-lg text-center">
          <h2 className="font-display-lg-mobile text-display-lg-mobile text-on-surface mb-2">Tu información</h2>
        </div>

        <form className="space-y-stack-md" onSubmit={handleSubmit}>
          {/* Avatar */}
          <div className="flex flex-col items-center mb-stack-lg">
            <button type="button" onClick={() => fileInputRef.current?.click()}
              className="relative w-32 h-32 rounded-full bg-surface-container border-2 border-dashed border-primary/30 flex items-center justify-center overflow-hidden hover:border-primary transition-colors cursor-pointer"
              aria-label="Cambiar foto de perfil">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Vista previa" className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <>
                  <img className="absolute inset-0 w-full h-full object-cover opacity-20" src={AVATAR_PLACEHOLDER} alt="" aria-hidden="true" />
                  <div className="z-10 flex flex-col items-center text-primary">
                    <span className="material-symbols-outlined text-4xl mb-1">photo_camera</span>
                    <span className="font-label-sm text-label-sm">Cambiar Foto</span>
                  </div>
                </>
              )}
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
            {/* Nombre */}
            <div className="md:col-span-2">
              <label className="font-label-md text-label-md text-on-surface-variant block mb-unit" htmlFor="nombre">Nombre Completo</label>
              <input id="nombre" type="text" placeholder="Ej. Juan Pérez" value={nombre} onChange={(e) => setNombre(e.target.value)}
                className="w-full bg-[#F1F1F5] border-transparent focus:border-primary-container focus:ring-0 rounded-xl px-4 py-3 font-body-md transition-all outline-none" />
            </div>

            <div>
              <label className="font-label-md text-label-md text-on-surface-variant block mb-unit" htmlFor="apellidoPaterno">Apellido paterno</label>
              <input id="apellidoPaterno" type="text" placeholder="Paterno" value={apellidoPaterno} onChange={(e) => setApellidoPaterno(e.target.value)}
                className="w-full bg-[#F1F1F5] border-transparent focus:border-primary-container focus:ring-0 rounded-xl px-4 py-3 font-body-md transition-all outline-none" />
            </div>
            <div>
              <label className="font-label-md text-label-md text-on-surface-variant block mb-unit" htmlFor="apellidoMaterno">Apellido materno</label>
              <input id="apellidoMaterno" type="text" placeholder="Materno" value={apellidoMaterno} onChange={(e) => setApellidoMaterno(e.target.value)}
                className="w-full bg-[#F1F1F5] border-transparent focus:border-primary-container focus:ring-0 rounded-xl px-4 py-3 font-body-md transition-all outline-none" />
            </div>

            {/* Email */}
            <div className="md:col-span-2">
              <label className="font-label-md text-label-md text-on-surface-variant block mb-unit" htmlFor="email">Email</label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-4 text-on-surface-variant/60">mail</span>
                <input id="email" type="email" placeholder="usuario@ejemplo.com" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#F1F1F5] border-transparent focus:border-primary-container focus:ring-0 rounded-xl pl-12 pr-4 py-3 font-body-md transition-all outline-none" />
              </div>
            </div>

            {/* Password */}
            <div className="md:col-span-2">
              <label className="font-label-md text-label-md text-on-surface-variant block mb-unit" htmlFor="password">
                Nueva contraseña <span className="text-on-surface-variant/50 font-normal">(dejar vacío para no cambiar)</span>
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-4 text-on-surface-variant/60">lock</span>
                <input id="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••••••" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#F1F1F5] border-transparent focus:border-primary-container focus:ring-0 rounded-xl pl-12 pr-12 py-3 font-body-md transition-all outline-none" />
                <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-4 text-on-surface-variant/60 hover:text-primary transition-colors" aria-label={showPassword ? 'Ocultar' : 'Mostrar'}>
                  <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
            </div>

            {/* Fecha y teléfono */}
            <div>
              <label className="font-label-md text-label-md text-on-surface-variant block mb-unit" htmlFor="birthDate">Fecha de nacimiento</label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-4 text-on-surface-variant/60">calendar_today</span>
                <input id="birthDate" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full bg-[#F1F1F5] border-transparent focus:border-primary-container focus:ring-0 rounded-xl pl-12 pr-4 py-3 font-body-md transition-all outline-none" />
              </div>
            </div>
            <div>
              <label className="font-label-md text-label-md text-on-surface-variant block mb-unit" htmlFor="phone">Teléfono</label>
              <div className="flex gap-2">
                <div className="bg-[#F1F1F5] rounded-xl px-3 py-3 flex items-center font-label-md text-on-surface-variant whitespace-nowrap">+52</div>
                <input id="phone" type="tel" placeholder="55 1234 5678" value={phone} onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#F1F1F5] border-transparent focus:border-primary-container focus:ring-0 rounded-xl px-4 py-3 font-body-md transition-all outline-none" />
              </div>
            </div>

            {/* Género */}
            <div className="md:col-span-2">
              <label className="font-label-md text-label-md text-on-surface-variant block mb-unit">Género</label>
              <div className="flex flex-wrap gap-4">
                {GENDERS.map(({ value, label, icon }) => (
                  <label key={value} className="flex-1 min-w-[100px] cursor-pointer">
                    <input type="radio" name="gender" value={value} checked={gender === value} onChange={() => setGender(value)} className="hidden" />
                    <div className={`flex items-center justify-center gap-2 py-3 rounded-xl border transition-all font-label-md text-label-md
                      ${gender === value ? 'bg-primary-container text-white border-primary-container' : 'bg-[#F1F1F5] border-transparent text-on-surface'}`}>
                      <span className="material-symbols-outlined text-[20px]">{icon}</span>
                      {label}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {error && <p className="font-label-sm text-label-sm text-error">{error}</p>}

          <div className="pt-stack-lg">
            <button type="submit" disabled={loading}
              className={`w-full py-4 rounded-xl font-headline-sm text-headline-sm shadow-[0_4px_20px_rgba(98,54,255,0.3)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed
                ${saved ? 'bg-secondary text-white' : 'bg-primary-container text-white'}`}>
              {saved ? (
                <><span className="material-symbols-outlined">check_circle</span>Guardado</>
              ) : loading ? (
                <><span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>Guardando...</>
              ) : (
                <><span className="material-symbols-outlined">edit</span>Guardar cambios</>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
