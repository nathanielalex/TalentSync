import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage'
import AuthPage from './pages/AuthPage'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import Dashboard from './pages/dashboard'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
          <Routes>
            {/* public route */}
            <Route path="/login" element={<AuthPage />} />
            <Route path="/" element={<LandingPage />} />
            
            {/* private route */}
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            {/* fallback route */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
