import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'artisan' | 'buyer';

type User = {
  id?: string;
  name?: string;
  email?: string;
  role: UserRole;
  isAnonymous: boolean;
};

type UserContextType = {
  user: User | null;
  loginAnonymous: (role: UserRole) => void;
  logout: () => void;
  setUser: (user: User) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing user session on mount
    const isAnonymous = localStorage.getItem('isAnonymous') === 'true';
    const userRole = (localStorage.getItem('userRole') as UserRole) || 'buyer';
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (isAnonymous) {
      setUserState({
        id: 'anonymous',
        name: 'Guest User',
        role: userRole,
        isAnonymous: true
      });
    } else if (storedToken && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUserState({
          ...userData,
          isAnonymous: false
        });
      } catch (err) {
        console.error('Failed to parse stored user:', err);
      }
    }
  }, []);

  const loginAnonymous = (role: UserRole) => {
    localStorage.setItem('isAnonymous', 'true');
    localStorage.setItem('userRole', role);
    const newUser: User = {
      id: 'anonymous',
      name: 'Guest User',
      role,
      isAnonymous: true
    };
    setUserState(newUser);
  };

  const logout = () => {
    localStorage.removeItem('isAnonymous');
    localStorage.removeItem('userRole');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUserState(null);
  };

  const setUser = (newUser: User) => {
    setUserState(newUser);
    if (!newUser.isAnonymous) {
      localStorage.setItem('user', JSON.stringify(newUser));
    }
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      loginAnonymous, 
      logout, 
      setUser 
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within a UserProvider');
  return context;
}
