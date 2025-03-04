import { Route, Navigate, Outlet } from 'react-router-dom'; // For v6, use Outlet to render nested routes
import { useAuth } from '../context/AuthContext'; // Import the custom AuthContext

// PrivateRoute component that wraps around the protected routes
const PrivateRoute: React.FC = () => {
  const { authData } = useAuth(); // Destructure the auth state (or can use isAuthenticated)
  const isAuthenticated = authData.isAuthenticated;

  if (!isAuthenticated) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the protected route (or nested routes via Outlet)
  return <Outlet />;
};

export default PrivateRoute;
