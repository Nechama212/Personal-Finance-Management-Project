import React, { createContext, useContext, useState, ReactNode, FC, useEffect } from 'react';

// Define the shape of the context data
interface UserContextType {
  email: string;
  setEmail: (email: string) => void;
}

// Create the context with a default value
const UserContext = createContext<UserContextType | undefined>(undefined);

// Context provider component
export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [email, setEmail] = useState<string>(() => {
    return localStorage.getItem('Email') || '';
  });

  useEffect(() => {
    console.log('User email updated:', email);
    if (email) {
      localStorage.setItem('Email', email);
    }
  }, [email]);

  return (
    <UserContext.Provider value={{ email, setEmail }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
