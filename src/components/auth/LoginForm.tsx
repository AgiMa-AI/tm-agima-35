
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, User, Key, ChevronRight } from 'lucide-react';

interface LoginFormProps {
  isLoading: boolean;
  onSubmit: (username: string, password: string) => Promise<void>;
}

const LoginForm = ({ isLoading, onSubmit }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData.username, formData.password);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="username" className="text-sm font-medium">AGI账户</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            id="username" 
            placeholder="输入您的AGI账户" 
            className="pl-10"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            required
          />
        </div>
      </div>
      
      <div className="space-y-1.5 sm:space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password" className="text-sm font-medium">密码</Label>
          <Link 
            to="/forgot-password" 
            className="text-xs sm:text-sm text-primary hover:text-primary/80 transition-colors"
          >
            忘记密码?
          </Link>
        </div>
        <div className="relative">
          <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            id="password" 
            type={showPassword ? "text" : "password"} 
            placeholder="输入您的密码"
            className="pl-10 pr-10"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
          <button 
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground touch-target"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
      
      <Button 
        type="submit" 
        className="w-full h-11 sm:h-12 mt-2 rounded-xl shadow-md hover:shadow-lg transition-all font-medium text-base"
        disabled={isLoading}
      >
        {isLoading ? "登录中..." : (
          <span className="flex items-center justify-center">
            登录
            <ChevronRight className="ml-2 h-5 w-5" />
          </span>
        )}
      </Button>
    </form>
  );
};

export default LoginForm;
