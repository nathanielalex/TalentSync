import React from 'react';
import { useAuth } from '../context/AuthContext'; // Import the custom hook
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

const AuthButtons: React.FC = () => {
  const { authData, logout } = useAuth(); // Access authData and logout function from context
  const navigate = useNavigate();
  
  function handleClick() {
    navigate("/login");
  }
  
  return (
    <div>
      {authData.isAuthenticated ? (
        // If the user is authenticated, show the "Logout" button
        <Button onClick={logout}>Logout</Button>
      ) : (
        // If the user is not authenticated, show the "Login" button
        <Button variant="outline" onClick={handleClick}>Login</Button>
      )}
    </div>
  );
};

export default AuthButtons;
