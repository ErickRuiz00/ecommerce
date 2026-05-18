import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ShopPage from './pages/ShopPage'
import CartPage from './pages/CartPage'
import ProfilePage from './pages/ProfilePage'
import AddItemPage from './pages/AddItemPage'

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('auth_token')
  return token ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/"        element={<LoginPage />} />
        <Route path="/login"   element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected */}
        <Route path="/shop"     element={<ProtectedRoute><ShopPage /></ProtectedRoute>} />
        <Route path="/cart"     element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
        <Route path="/profile"  element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/add-item" element={<ProtectedRoute><AddItemPage /></ProtectedRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
