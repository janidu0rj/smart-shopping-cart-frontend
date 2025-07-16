import React, { createContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../hooks/services/authService';
import { AuthContextType, Profile } from '../types/Auth';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [profile, setProfile] = useState<Profile | null>(null);

  // useEffect(() => {
  //   // Check if user is logged in on mount
  //   const data = authService.getCurrentUser();
  //   const updatedProfile: Profile = {
  //     ...data,
  //     username: "myUsername"
  //   };

  //   if (data && data.token) {
  //     setIsAuthenticated(true);
  //     setProfile(updatedProfile);
  //     // navigate('/editor');
  //   }
  // }, []);

const login = async (username: string, password: string) => {
  const response = await authService.login({ username, password });
  setIsAuthenticated(true);
  setProfile({ ...profile, username });
  console.log("Login successful:", response);
  if(response.role === 'CASHIER') {
    navigate('/cashier-home');}
    else{
      navigate("/dashboard");
    }
  
};


  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setProfile(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, profile, setProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
