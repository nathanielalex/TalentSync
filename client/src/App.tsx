import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage'
import AuthPage from './pages/AuthPage'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import Dashboard from './pages/dashboard'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import JobPage from './pages/JobsPage'
import JobDetailPage from './pages/JobDetailPage'
import JobPostingPage from './pages/JobPostingPage'
import SeekerProfilePage from './pages/SeekerProfilePage'
import RecruiterJobListingPage from './pages/RecruiterJobListingPage'
import FillSeekerProfilePage from './pages/FillSeekerProfilePage'
import { UserProvider, useUser } from './context/UserContex'

function App() {
  const { isNew } = useUser();
  
  return (
    <BrowserRouter>
      <Routes>
        {/* public route */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/jobs" element={<JobPage />} />
        <Route path="/jobs/:id" element={<JobDetailPage />} />
        <Route
          path="/seeker-profile"
          element={isNew ? <FillSeekerProfilePage /> : <SeekerProfilePage />}
        />
        <Route path="/recruiter-jobs/:recruiterId" element={<RecruiterJobListingPage />} />
        
        {/* private route */}
        <Route element={<PrivateRoute />}>
          <Route path="/job-posting" element={<JobPostingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* fallback route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  )
}

// Wrap the entire app in UserProvider and AuthProvider
const AppWithProviders = () => (
  <UserProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </UserProvider>
)

export default AppWithProviders
