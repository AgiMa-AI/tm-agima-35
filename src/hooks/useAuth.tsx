
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

interface User {
  id: string;
  username: string;
  email: string;
  role: 'renter' | 'provider' | 'admin';
  avatar?: string;
  balance?: number;
  credits?: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string, role: 'renter' | 'provider') => Promise<boolean>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data - replace with real API calls in your implementation
const mockUsers = [
  {
    id: '1',
    username: 'demo',
    email: 'demo@example.com',
    password: 'password123',
    role: 'renter' as const,
    avatar: '',
    balance: 100,
    credits: 50
  },
  {
    id: '2',
    username: 'provider',
    email: 'provider@example.com',
    password: 'password123',
    role: 'provider' as const,
    avatar: '',
    balance: 5000,
    credits: 200
  },
  // 添加腾目科技/Agi-Ma的演示账户
  {
    id: '3',
    username: 'agima',
    email: 'admin@agima.io',
    password: 'agima123',
    role: 'admin' as const,
    avatar: '',
    balance: 10000,
    credits: 1000
  }
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const foundUser = mockUsers.find(
        u => (u.username === username || u.email === username) && u.password === password
      );
      
      if (foundUser) {
        const { password, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        toast({
          title: "登录成功",
          description: `欢迎回到 Agi-Ma，${userWithoutPassword.username}！`,
        });
        return true;
      } else {
        toast({
          variant: "destructive",
          title: "登录失败",
          description: "用户名或密码错误",
        });
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        variant: "destructive",
        title: "登录失败",
        description: "服务器错误，请稍后再试",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    username: string, 
    inviteCodeOrEmail: string, 
    password: string, 
    role: 'renter' | 'provider'
  ): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 检查邀请码是否有效 (实际应用中，这里应该验证邀请码)
      // 这里使用简单逻辑：检查邀请码不为空并且至少有3个字符
      if (!inviteCodeOrEmail.includes('@')) {
        toast({
          variant: "destructive",
          title: "注册失败",
          description: "邀请码格式无效",
        });
        return false;
      }
      
      const userExists = mockUsers.some(
        u => u.username === username || u.email === inviteCodeOrEmail
      );
      
      if (userExists) {
        toast({
          variant: "destructive",
          title: "注册失败",
          description: "用户名已被使用",
        });
        return false;
      }
      
      // In a real app, this would be handled by your backend
      const newUser = {
        id: `${mockUsers.length + 1}`,
        username,
        email: inviteCodeOrEmail,
        role,
        avatar: '',
        balance: 0,
        credits: 10
      };
      
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      toast({
        title: "注册成功",
        description: "欢迎加入 Agi-Ma 平台！",
      });
      
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        variant: "destructive",
        title: "注册失败",
        description: "服务器错误，请稍后再试",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast({
      title: "已退出登录",
    });
    navigate('/login');
  };

  const updateUser = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Wrap your app with this in App.tsx
export const withAuth = (Component: React.ComponentType) => {
  return function WithAuth(props: any) {
    return (
      <AuthProvider>
        <Component {...props} />
      </AuthProvider>
    );
  };
};
