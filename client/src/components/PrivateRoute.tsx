import { Route, Navigate, Outlet } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext'; 

const PrivateRoute: React.FC = () => {
  const { authData } = useAuth(); 
  const isAuthenticated = authData.isAuthenticated;

  if (!isAuthenticated) {
    
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
