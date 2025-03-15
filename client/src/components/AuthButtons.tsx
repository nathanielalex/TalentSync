import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

const AuthButtons: React.FC = () => {
  const { authData, logout } = useAuth();
  const navigate = useNavigate();
  
  function handleClick() {
    navigate("/login");
  }

  function handleLogout(){
    logout()
    navigate("/");
  }
  
  return (
    <div>
      {authData.isAuthenticated ? (
        <Button onClick={handleLogout}>Logout</Button>
      ) : (
        <Button variant="outline" onClick={handleClick}>Login</Button>
      )}
    </div>
  );
};

export default AuthButtons;
