import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface UserContextType {
  isRegistered: boolean;
  isNew: boolean;
  setIsRegistered: React.Dispatch<React.SetStateAction<boolean>>;
  setIsNew: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [isNew, setIsNew] = useState<boolean>(true);

  useEffect(() => {
    const checkUserStatus = () => {
      const userStatus = localStorage.getItem('isRegistered');
      const userNewStatus = localStorage.getItem('isNew');

      setIsRegistered(userStatus === 'true');
      setIsNew(userNewStatus === 'true');
    };

    checkUserStatus();
  }, []);

  return (
    <UserContext.Provider value={{ isRegistered, isNew, setIsRegistered, setIsNew }}>
      {children}
    </UserContext.Provider>
  );
};
