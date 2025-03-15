import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

const ProfileButton: React.FC = () => {
  const { authData, userId } = useAuth();
  const navigate = useNavigate();

  if (!authData.isAuthenticated) {
    return null;
  }

  function handleClick() {
    navigate(`/seeker-profile/${userId}`);
  }

  return (
    <div>
      <Button onClick={handleClick}>Profile</Button>
    </div>
  );
};

export default ProfileButton;
