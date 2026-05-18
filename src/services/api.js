const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api'

function getToken() {
  return localStorage.getItem('auth_token')
}

async function request(method, path, body) {
  const token = getToken()
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  })
  if (!res.ok) {
    const msg = await res.text().catch(() => res.statusText)
    throw new Error(msg || `HTTP ${res.status}`)
  }
  const text = await res.text()
  return text ? JSON.parse(text) : null
}

export const api = {
  // ── Auth ──────────────────────────────────────────────────────────────────
  // POST /auth/login  → { token, user }
  login: (email, password) =>
    request('POST', '/auth/login', { email, password }),

  // POST /auth/register  → 201 Created
  register: (data) => request('POST', '/auth/register', data),

  // Clears the stored token (no server call required for stateless JWT)
  logout: () => {
    localStorage.removeItem('auth_token')
    return Promise.resolve()
  },

  // ── Profile ───────────────────────────────────────────────────────────────
  // GET  /users/me  → user object
  getProfile: () => request('GET', '/users/me'),

  // PUT  /users/me  → updated user object
  // Accepts FormData when avatar is included (handled separately)
  updateProfile: (data) => {
    if (data instanceof FormData) {
      return fetch(`${BASE}/users/me`, {
        method: 'PUT',
        headers: { ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}) },
        body: data,
      }).then(async (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
    }
    return request('PUT', '/users/me', data)
  },

  // ── Products ──────────────────────────────────────────────────────────────
  // GET  /products?search=query  → [product]
  getProducts: (query = '') =>
    request('GET', `/products${query ? `?search=${encodeURIComponent(query)}` : ''}`),

  // POST /products  (multipart/form-data with image)  → product
  addProduct: (formData) =>
    fetch(`${BASE}/products`, {
      method: 'POST',
      headers: { ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}) },
      body: formData,
    }).then(async (r) => {
      if (!r.ok) throw new Error(`HTTP ${r.status}`)
      return r.json()
    }),

  // ── Cart ──────────────────────────────────────────────────────────────────
  // GET    /cart              → { items: [cartItem] }
  getCart: () => request('GET', '/cart'),

  // POST   /cart/items        → cartItem   body: { productId, qty }
  addToCart: (productId, qty = 1) =>
    request('POST', '/cart/items', { productId, qty }),

  // PUT    /cart/items/:id    → cartItem   body: { qty }
  updateCartItem: (itemId, qty) =>
    request('PUT', `/cart/items/${itemId}`, { qty }),

  // DELETE /cart/items/:id   → 204
  removeFromCart: (itemId) => request('DELETE', `/cart/items/${itemId}`),

  // DELETE /cart             → 204
  clearCart: () => request('DELETE', '/cart'),

  // ── Orders ────────────────────────────────────────────────────────────────
  // POST /orders  body: { items }  → order
  checkout: (items) => request('POST', '/orders', { items }),
}
