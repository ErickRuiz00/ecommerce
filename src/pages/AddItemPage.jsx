import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api'

const PLACEHOLDER_IMG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDM8Mr2Pw4sQ6NQiVX8MaKXIh6dRtdmStqKtYfK0C0SgLppqA5CqUdTNIQAy_46NrfeKr6JE6NuF1W2N3G-PdxchxOcpl68p03M6087G9pnc-qi6L8vU6FL2HkVju7mNkUF-TqJRMeU6FaMdUd932ycVYnZDBxBmHOLifOofDDnIu0YiVxxnSHjJ7Yi4bilDGdcuGh7R-wIBGSrIlgtz9ofV-3gIBgk7ns67gMPJjr1KjjOFopYCgCu4-302F1qd7U20XQZu9nNOw_5'


export default function AddItemPage() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)

  const [imagePreview, setImagePreview] = useState(null)
  const [imageFile, setImageFile] = useState(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleImageChange(e) {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('price', price)
    formData.append('stock', stock)
    if (imageFile) formData.append('image', imageFile)

    try {
      await api.addProduct(formData)
      setSaved(true)
      setTimeout(() => {
        setSaved(false)
        navigate('/shop')
      }, 1500)
    } catch {
      setError('Error al guardar el artículo')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-background text-on-background min-h-screen pb-20">
      {/* ── Top App Bar ── */}
      <header className="fixed top-0 left-0 w-full flex items-center justify-between px-margin-mobile h-16 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/10 shadow-sm z-50">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="text-primary hover:bg-primary/5 active:scale-95 transition-all duration-200 p-2 rounded-full"
            aria-label="Regresar"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="font-headline-sm text-headline-sm text-on-surface">Agregar Artículo</h1>
        </div>
        <div className="w-10" />
      </header>

      <main className="pt-24 px-margin-mobile max-w-2xl mx-auto space-y-stack-lg">
        {/* ── Image Upload ── */}
        <section className="space-y-stack-sm">
          <label className="font-label-md text-label-md text-outline px-1">
            Imagen del Producto
          </label>
          <div className="relative group">
            <div
              className="w-full aspect-[4/3] rounded-3xl overflow-hidden bg-surface-container-low border-2 border-dashed border-outline-variant/30 flex flex-col items-center justify-center gap-3 transition-all group-hover:border-primary/50 group-hover:bg-primary/5 cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Vista previa del producto"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <>
                  <img
                    className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none mix-blend-overlay"
                    src={PLACEHOLDER_IMG}
                    alt=""
                    aria-hidden="true"
                  />
                  <div className="z-10 bg-primary/10 p-4 rounded-full text-primary transition-transform group-hover:scale-110">
                    <span className="material-symbols-outlined text-4xl">add_a_photo</span>
                  </div>
                  <div className="z-10 text-center">
                    <p className="font-label-md text-label-md text-on-surface">Subir Fotografía</p>
                    <p className="font-label-sm text-label-sm text-outline">JPG, PNG hasta 10MB</p>
                  </div>
                </>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
        </section>

        {/* ── Form ── */}
        <form className="space-y-stack-md pb-stack-lg" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="space-y-unit">
            <label
              className="font-label-md text-label-md text-on-surface-variant block ml-1"
              htmlFor="item_name"
            >
              Nombre del Artículo
            </label>
            <input
              id="item_name"
              type="text"
              placeholder="Ej. Smartwatch Horizon X"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#F1F1F5] border-none rounded-xl px-4 py-3 font-body-md focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none"
            />
          </div>

          {/* Description */}
          <div className="space-y-unit">
            <label
              className="font-label-md text-label-md text-on-surface-variant block ml-1"
              htmlFor="description"
            >
              Descripción
            </label>
            <textarea
              id="description"
              placeholder="Escribe los detalles y especificaciones técnicas..."
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#F1F1F5] border-none rounded-xl px-4 py-3 font-body-md focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none resize-none"
            />
          </div>

          {/* Price + Stock */}
          <div className="grid grid-cols-2 gap-gutter">
            <div className="space-y-unit">
              <label
                className="font-label-md text-label-md text-on-surface-variant block ml-1"
                htmlFor="price"
              >
                Precio
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-outline font-semibold">
                  $
                </span>
                <input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-[#F1F1F5] border-none rounded-xl pl-8 pr-4 py-3 font-body-md focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none"
                />
              </div>
            </div>

            <div className="space-y-unit">
              <label
                className="font-label-md text-label-md text-on-surface-variant block ml-1"
                htmlFor="stock"
              >
                Stock
              </label>
              <input
                id="stock"
                type="number"
                min="0"
                placeholder="12"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full bg-[#F1F1F5] border-none rounded-xl px-4 py-3 font-body-md focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none"
              />
            </div>
          </div>

          {error && <p className="font-label-sm text-label-sm text-error px-1">{error}</p>}

          {/* ── Bottom Action Bar ── */}
          <div className="fixed bottom-0 left-0 w-full bg-surface/80 backdrop-blur-xl border-t border-outline-variant/10 p-4 z-50">
            <div className="max-w-2xl mx-auto">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-headline-sm text-headline-sm shadow-lg active:scale-95 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed
                  ${saved
                    ? 'bg-secondary text-white shadow-secondary/20'
                    : 'bg-primary text-on-primary shadow-primary/20'
                  }`}
              >
                {saved ? (
                  <>
                    <span className="material-symbols-outlined">check_circle</span>
                    ¡Artículo guardado!
                  </>
                ) : loading ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[18px]">progress_activity</span>
                    Guardando...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined">save</span>
                    Guardar Artículo
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}
