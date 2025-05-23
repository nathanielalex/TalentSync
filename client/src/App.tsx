import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './components/PrivateRoute'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import JobPage from './pages/JobsPage'
import JobDetailPage from './pages/JobDetailPage'
import JobPostingPage from './pages/JobPostingPage'
import SeekerProfilePage from './pages/SeekerProfilePage'
import RecruiterJobListingPage from './pages/RecruiterJobListingPage'
import FillSeekerProfilePage from './pages/FillSeekerProfilePage'
import { UserProvider, useUser } from './context/UserContex'
import ApplicantListPage from './pages/ApplicantListPage'
import ViewProfilePage from './pages/ViewProfilePage'
import JobsAppliedPage from './pages/JobsAppliedPage'

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
        <Route path="/applicants/:id" element={<ApplicantListPage />} />
        <Route path="/jobs/:id" element={<JobDetailPage />} />
        <Route
          path="/seeker-profile"
          element={isNew ? <FillSeekerProfilePage /> : <SeekerProfilePage />}
        />
        <Route path="/recruiter-jobs/:recruiterId" element={<RecruiterJobListingPage />} />
        <Route path="/view-profile/:id" element={<ViewProfilePage />} />
        <Route path="/jobs-applied/:id" element={<JobsAppliedPage />} />
        
        {/* private route */}
        <Route element={<PrivateRoute />}>
          <Route path="/job-posting" element={<JobPostingPage />} />
        </Route>

        {/* fallback route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  )
}

const AppWithProviders = () => (
  <UserProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </UserProvider>
)

export default AppWithProviders
