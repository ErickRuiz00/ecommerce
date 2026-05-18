import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { api } from '../services/api'

// ─── Static data (replaced by api.getProducts when backend is live) ──────────

const PRODUCTS = [
  { id: 1, name: 'Neural Tablet X1', desc: 'Next-gen performance', price: '$1,299',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUQkDesTmLOx74nAtRKJD_mPbsIBTR2M82AOvIll14KplkI7eM-tFKDOzRkRmjFD8Hctf7hOZK_5D_mkgsg4nPpamHJz_trrkylfKGd7V6ASLphEGE1RtdPaYHs_Xm0bT17PqX23FuiqOw9WefEfzVAVVA4uo2g9HAOB-mNcGSC6HBB9qufHCmEgKdXYRJmPTJ2ZJEMOxAshmfyeNhIjCfmRjvdAvMEw55UAcsWP9zzysErvJxNFZDktLobiuvbiwMtgRG0NTKxq3C' },
  { id: 2, name: 'Sonic Flow Buds', desc: 'Immersive soundscapes', price: '$499',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAegeXYlHg-eLZea3Tvo8TR2o6qtLBuVzd_8TTwNM6kEGT739Z3zQ_izTNmX4AgMmkGsWVca7q6KY_TeN9ljMtqUBYHkP8VD25xIachKy0uYNqZEelXPuWxMZui_G9eaGD-yVjcFgAWGBRSO8HYstYVx19hOC6SBhkE_pWBi_N9T4580kTDnCqiv_4EM42Zy_77X83GsiZm7bsX5VFMdKm5eSzxDanmWXZeGW2YYst4FTgjs02L0KWsSg_qfc5ZWkqWSIpbAfzK11Az' },
  { id: 3, name: 'Aura Watch v4', desc: 'Life metrics synced', price: '$350',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCpB4mT5VRux7QeV6Akl7Gl98W9dG4coDgqQ_6uLLtLTRUt8QULB8dBoBHqkY0XQ-ETTmStiEnkDRdnkeZOXwp4RgKuAtoc9ikGOYTEAThuCdc9sDhXo3EGdNG7Ia2l7hlyfo2gHLEUAJe3TtX_ljcrLHdWEvWdAePYlcLpm1e6d-PCG2kzQ2XrP79l1T9Dn8Br24xJtW1uOtKKk5a4eIX9fGWLUgfsD7oCvqworb1LS7fMe82FJJIrVEe1hJPreaGXnq9iMDMCgaFv' },
  { id: 4, name: 'Vision Goggles Pro', desc: 'Beyond reality tech', price: '$899',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwM8n8t4qINcpKxQN1HK05V0LlgxRTsmWfdoUa3SzddFUBwT7pll8__pasO0MJmFlKUU4ivpHkmJNRKJ2XyMXKYO2y9jl5oXblj_C-_M1gs2eJY5Za-YTU6Dj6wYBWUdpaV9wihLbLQ1raz9YwzsJ8LOI8qqzZvFn2r-r4FQUxI1GLaHNI22JWCZ3loBspqJ4yZKUaIpOO48_aGPV3SE5udX1FElalNNolpMCmTVSqhuX02jI3KhPBIgqak9FjXnO-h4ChZPcI6Wy0' },
]

const USER_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrZsUwNf37MvfES-nhq1mfFEynErVgdr7psrsPw9RKHqAp9Hu2dvajDmFFqtLfoTNtB3bjwi-IXsmXp4ZfZ7CKbCbsvErlHBJ4JMAtoa8x6UetLrWJnStEzDWETlldfL5NxROc8R2D6OEqRK2Nk7jxx-xkckHZC7nN2NXDhAuI2Su82fK2g6zh4EPUB4SZPcOA16mmQ09iIb7wS7N2WfBa-OWdV2XXWatmuNeq109W8PqID3Pp36-azOgf73z0ShmmZiPysaOVzQwc'
const SIDEBAR_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDFVIxz03gE2aWx_8DGNmp79yP9JBRI-0xQtpKGriaEP0wXB8E9FdvXKUEgNlTy68zqmZ-mOq2w1o2w1xVDOLELIGMY3nFJPwdpkE9mkruC5HtYwH_qwFGv0YWYGTGz7pZWEZLu9Y3r5tdoI59WH9UtfNJasGP1vqOH1268nnTSw2HGu_Ccd4OXTqqKd_mACTmP7H27UcXtJGBpSx1HMkiSlDu590PMy-KT4EENUVjLjh3GIm9uieUBDzD3x344oGZihWdnVTPxVlV'

// ─── Component ───────────────────────────────────────────────────────────────

export default function ShopPage() {
  const navigate = useNavigate()
  const { logout, user } = useAuth()
  const dropdownRef = useRef(null)

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [products, setProducts] = useState(PRODUCTS)

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // Close sidebar on Escape
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') setSidebarOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [])

  // Debounced search — calls backend; falls back to local filter on error
  useEffect(() => {
    const local = PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.desc.toLowerCase().includes(search.toLowerCase()),
    )
    setProducts(local)

    if (!search) return
    const timer = setTimeout(() => {
      api.getProducts(search)
        .then((data) => { if (data) setProducts(data) })
        .catch(() => {})
    }, 400)
    return () => clearTimeout(timer)
  }, [search])

  async function handleLogout() {
    await logout()
    navigate('/login')
  }

  async function handleAddToCart(productId) {
    try {
      await api.addToCart(productId)
    } catch {
      // TODO: show toast notification
    }
  }

  return (
    <div className="min-h-screen bg-[#F0F0F0] text-[#e5e1e4]">
      {/* ── Top App Bar ── */}
      <header className="bg-surface/80 backdrop-blur-xl fixed top-0 w-full z-50 border-b border-white/10 shadow-[0_0_20px_rgba(201,191,255,0.1)] flex justify-between items-center px-margin-mobile h-16">
        <div className="flex items-center gap-4">
          <button type="button" onClick={() => setSidebarOpen((v) => !v)}
            className="text-primary active:scale-95 transition-transform duration-200" aria-label="Abrir menú">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <Link to="/shop" className="font-display-lg-mobile text-display-lg-mobile text-primary tracking-tighter">
            Tienda
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {/* Profile dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button type="button" onClick={() => setDropdownOpen((v) => !v)}
              className="flex items-center gap-2 bg-surface-container-high rounded-full pl-1 pr-3 py-1 hover:opacity-80 transition-opacity active:scale-95 duration-200">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-primary/20">
                <img src={USER_IMG} alt="Perfil" className="w-full h-full object-cover" />
              </div>
              <span className="font-label-md text-label-md text-on-surface hidden md:block">
                {user?.nombre ?? 'Future Shopper'}
              </span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-surface-container-highest border border-outline-variant rounded-xl py-2 z-10 shadow-lg">
                <button type="button" onClick={() => { setDropdownOpen(false); navigate('/profile') }}
                  className="w-full text-left block px-4 py-2 font-body-md text-on-surface hover:bg-primary/10 transition-colors">
                  Ver perfil
                </button>
                <button type="button" onClick={handleLogout}
                  className="w-full text-left block px-4 py-2 font-body-md text-error hover:bg-error/10 transition-colors">
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>

          <button type="button" onClick={() => navigate('/cart')}
            className="text-primary active:scale-95 transition-transform duration-200" aria-label="Ver carrito">
            <span className="material-symbols-outlined">shopping_cart</span>
          </button>
        </div>
      </header>

      {/* ── Sidebar Overlay ── */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-[55] bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)} aria-hidden="true" />
      )}

      {/* ── Navigation Drawer ── */}
      <nav className={`bg-surface-container h-full w-72 rounded-r-xl shadow-2xl fixed inset-y-0 left-0 z-[60] flex flex-col transition-transform duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`} aria-label="Menú principal">
        <div className="p-6 flex flex-col gap-1">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary mb-4">
            <img src={SIDEBAR_IMG} alt="Perfil" className="w-full h-full object-cover" />
          </div>
          <h2 className="font-headline-sm text-headline-sm text-primary">{user?.nombre ?? 'Future Shopper'}</h2>
          <p className="font-body-md text-on-surface-variant">Premium Member</p>
        </div>

        <div className="mt-4 flex flex-col gap-2 px-2">
          <Link to="/add-item" onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:text-on-surface hover:bg-white/5 rounded-lg transition-all duration-300">
            <span className="material-symbols-outlined">photo_camera</span>
            <span className="font-body-md">Captura artículo</span>
          </Link>
          <Link to="/shop" onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-4 px-4 py-3 bg-primary-container text-on-primary-container rounded-lg transition-all duration-300">
            <span className="material-symbols-outlined">shopping_bag</span>
            <span className="font-body-md">Compra de artículos</span>
          </Link>
        </div>

        <div className="mt-auto p-6 border-t border-white/5">
          <p className="font-label-sm text-label-sm text-on-surface-variant/50">v2.0.4</p>
        </div>
      </nav>

      {/* ── Main Content ── */}
      <main className="lg:ml-72 pt-24 pb-stack-lg px-margin-mobile">
        <div className="max-w-4xl mx-auto">
          {/* Search */}
          <div className="mb-stack-lg">
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-4 text-on-surface-variant">search</span>
              <input type="text" placeholder="Buscar productos..." value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-surface-container-high border-none rounded-full py-3 pl-12 pr-4 font-body-md text-on-surface placeholder:text-on-surface-variant/60 focus:ring-2 focus:ring-primary/30 transition-all outline-none" />
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 gap-gutter">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
            ))}
            {products.length === 0 && (
              <p className="col-span-2 text-center py-16 font-body-md text-on-surface-variant">
                No se encontraron productos.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({ product, onAddToCart }) {
  const { id, name, desc, price, img } = product

  return (
    <div className="glass-card rounded-2xl overflow-hidden group hover:border-primary/50 transition-all duration-300">
      <div className="aspect-square overflow-hidden">
        <img src={img} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-4">
        <h3 className="font-headline-sm text-headline-sm text-on-surface truncate">{name}</h3>
        <p className="font-label-md text-label-md text-primary mt-1">{price}</p>
        <p className="font-body-md text-on-surface-variant mt-1">{desc}</p>
        <button type="button" onClick={() => onAddToCart(id)}
          className="mt-4 w-full py-2 bg-primary text-on-primary font-label-md text-label-md rounded-xl active:scale-95 transition-transform neon-glow">
          Add to Cart
        </button>
      </div>
    </div>
  )
}
