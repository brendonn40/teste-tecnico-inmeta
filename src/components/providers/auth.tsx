import { createContext, useContext, useState, useEffect } from 'react';
import { useLogin } from '@/features/auth/hooks/useLogin';
import { toast } from 'sonner';

// Define the shape of the auth context
interface AuthContextType {
  user: any; // Replace 'any' with the appropriate type for your decoded JWT
  token: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  isLoading: boolean;
}

// Create the Auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null); // Use the appropriate type for your decoded JWT
  const [token, setToken] = useState<string | null>(null);

  const { mutate: handleLogin, isPending: isLoading } = useLogin();

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      const decodedUser = JSON.parse(localStorage.getItem('user') || 'null');
      setToken(savedToken);
      setUser(decodedUser);
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      handleLogin(
        { email, password },
        {
          onSuccess: (data: any) => {
            const decodedUser = data.data.user;
            localStorage.setItem('token', data.data.token);
            localStorage.setItem('user', JSON.stringify(decodedUser));
            setToken(data.token);
            setUser(decodedUser);
            window.location.href = '/';
          },
          onError: (error: any) => {
            console.log('error->', error);
            toast.error('Usuário ou senha inválidos!');
          },
        }
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // Function to handle sign-out
  const signOut = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const value = { user, token, signIn, signOut, isLoading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the Auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
