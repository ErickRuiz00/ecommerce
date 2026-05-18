import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// ─── Data ─────────────────────────────────────────────────────────────────────

const INITIAL_CART = [
  {
    id: 1,
    name: 'NeoRunner X-1',
    variant: 'Electric Violet Edition',
    price: 299.0,
    qty: 1,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfDzVaxmJnbWwfMELT5fJWCfPoCP3Bo2RvwrCtj1vtxAsFN7SEobzqoOi6iuwtloAhXbWzM0Yl2yBgpAwMS_kh0yuLv41ewCliNExqj87bCspJ-wtud8mNV--Gn21jlnfegw1YyVWb1qgvDDFh50CV1gQ3ivwDnIkMcL6gwRMEJL5OL3A0cpxPGirWzykRYLJX2SqPplBzLhxGSg2PkGc607-zHTdn_pyu2FC4kq9fxOx8B3JL1YBwdDNJ_Fzgpg81qGPnFzQmg9pI',
  },
  {
    id: 2,
    name: 'SyncWatch Pro',
    variant: 'Titanium / Stealth Black',
    price: 450.0,
    qty: 1,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPlJF2tetxiAGWPNgVmidHNLYZUHAp7pAigLGdUOErSpoiAB1nDx7q_kZqdjUbxAIfvEwTz7x9-6RJc3jyaulXDT833xb-fdI_1a2-UpDjmmDh-mP05qli0YGBav_vHCSCUB2rl6IJbAvDuhJmU9ue4xPVP3aMO7eDFhoaCv09AMhYzVmc1DTQW_gHfPXSIhPdWiXFPQFXh_Txa1LyVh0nSXkpkAoSF6vxk4GgMFO3FNG-EmoklmT_I5dr6jJeNQngqrc70Rn6EGBy',
  },
  {
    id: 3,
    name: 'SonicOver V2',
    variant: 'Noise-Cancellation XL',
    price: 189.0,
    qty: 1,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIKd-nAVEeZZ8uWS_DjDRmFpV8mj6WQdRLCrGTxbmAiFzA5EN4TiW0KWQcMgd4TLIPJmKlGSmE1BG55dZJdBA0QYa0gTl3hKGeidNMTESg1M8BtpUj-k1JqEwTmBfnFZpeRZYA28T6qUyivXOEm-DgvqVkwhtZ6aqoVQOC-4auXbs9EmaIjNGpt51YB0BI9DI4vlOoJJV16uuU0gKlnumIxeZUGeqkppfJfX5raDK_XEsWw2uqufGaxDmbBhnUPIOOyehCZueeVxCV',
  },
]

// ─── Component ────────────────────────────────────────────────────────────────

export default function CartPage() {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState(INITIAL_CART)

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)
  const totalQty = cartItems.reduce((sum, item) => sum + item.qty, 0)

  function updateQty(id, delta) {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item,
      ),
    )
  }

  function removeItem(id) {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <div className="antialiased bg-surface text-on-surface min-h-screen">
      {/* ── Top App Bar ── */}
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/20 shadow-[0_0_20px_rgba(201,191,255,0.1)]">
        <div className="flex justify-between items-center px-margin-mobile h-16 max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="active:scale-95 transition-transform hover:opacity-80"
              aria-label="Regresar"
            >
              <span className="material-symbols-outlined text-primary">arrow_back</span>
            </button>
            <Link
              to="/shop"
              className="font-display-lg-mobile text-display-lg-mobile text-primary tracking-tighter"
            >
              NEO-RETAIL
            </Link>
          </div>

          <div className="relative">
            <span className="material-symbols-outlined text-primary">shopping_cart</span>
            {totalQty > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-on-primary text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                {totalQty}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* ── Main Content ── */}
      <main className="pt-24 pb-52 px-margin-mobile max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-stack-lg">
          <h1 className="font-headline-md text-headline-md text-on-surface">Your Cart</h1>
          {cartItems.length > 0 && (
            <button
              type="button"
              onClick={() => setCartItems([])}
              className="flex items-center gap-1 font-label-md text-label-md text-error hover:bg-error/10 px-3 py-1.5 rounded-lg transition-colors active:scale-95"
            >
              <span className="material-symbols-outlined text-[18px]">delete_sweep</span>
              Vaciar carrito
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-[64px] text-on-surface-variant/40">
              shopping_cart
            </span>
            <p className="font-body-lg text-on-surface-variant mt-4">Tu carrito está vacío.</p>
            <Link
              to="/shop"
              className="mt-6 inline-block bg-primary-container text-on-primary-container font-label-md text-label-md px-6 py-3 rounded-xl"
            >
              Ver productos
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-stack-md">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQty={updateQty}
                  onRemove={removeItem}
                />
              ))}
            </div>

            {/* Back to shop */}
            <div className="mt-6">
              <Link
                to="/shop"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary text-primary font-display font-semibold rounded-xl hover:bg-primary/5 active:scale-[0.98] transition-all"
              >
                <span className="material-symbols-outlined ">arrow_back</span>
                Seguir comprando
              </Link>
            </div>            
          </>
        )}
      </main>

      {/* ── Bottom Checkout Bar + Nav ── */}
      <footer className="fixed bottom-0 w-full z-50 bg-surface-container/90 backdrop-blur-2xl border-t border-outline-variant/20 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="max-w-3xl mx-auto px-margin-mobile py-6">
          <div className="flex flex-col gap-4">
            {/* Total */}
            <div className="flex justify-between items-end">
              <div className="flex flex-col">
                <span className="text-on-surface-variant font-label-sm text-label-sm uppercase tracking-widest">
                  Total Amount
                </span>
                <span className="font-display-lg-mobile text-display-lg-mobile text-primary drop-shadow-[0_0_10px_rgba(201,191,255,0.3)]">
                  ${total.toFixed(2)}
                </span>
              </div>
              <div className="text-right">
                <span className="text-on-surface-variant font-label-sm text-label-sm block">
                  Tax included
                </span>
                <span className="text-on-surface-variant font-label-sm text-label-sm block">
                  Free shipping
                </span>
              </div>
            </div>

            {/* Checkout button */}
            <button
              type="button"
              className="w-full bg-primary-container text-on-primary-container font-headline-sm text-headline-sm py-4 rounded-xl shadow-[0_0_20px_rgba(98,54,255,0.4)] active:scale-95 transition-all duration-200 flex items-center justify-center gap-3"
            >
              Proceder al Checkout
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}

// ─── Cart Item ────────────────────────────────────────────────────────────────

function CartItem({ item, onUpdateQty, onRemove }) {
  const { id, name, variant, price, qty, img } = item

  return (
    <div className="rounded-xl p-4 flex gap-4 items-center bg-surface-container-low border border-outline-variant">
      <div className="h-20 w-20 rounded-lg overflow-hidden flex-shrink-0 bg-surface-container">
        <img src={img} alt={name} className="h-full w-full object-cover" />
      </div>

      <div className="flex-grow min-w-0">
        <div className="flex justify-between items-start">
          <h3 className="font-headline-sm text-headline-sm text-on-surface">{name}</h3>
          <button
            type="button"
            onClick={() => onRemove(id)}
            className="text-on-surface-variant hover:text-error transition-colors ml-2 flex-shrink-0"
            aria-label={`Eliminar ${name}`}
          >
            <span className="material-symbols-outlined">delete</span>
          </button>
        </div>

        <p className="font-body-md text-on-surface-variant mb-2">{variant}</p>

        <div className="flex justify-between items-center">
          {/* Qty controls */}
          <div className="flex items-center bg-surface-container-high rounded-full px-2 py-1">
            <button
              type="button"
              onClick={() => onUpdateQty(id, -1)}
              className="h-8 w-8 flex items-center justify-center text-on-surface-variant hover:text-primary"
              aria-label="Disminuir cantidad"
            >
              <span className="material-symbols-outlined text-[18px]">remove</span>
            </button>
            <span className="px-4 font-label-md text-label-md text-on-surface">{qty}</span>
            <button
              type="button"
              onClick={() => onUpdateQty(id, 1)}
              className="h-8 w-8 flex items-center justify-center text-on-surface-variant hover:text-primary"
              aria-label="Aumentar cantidad"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
            </button>
          </div>

          <span className="font-headline-sm text-headline-sm text-primary">
            ${(price * qty).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  )
}
