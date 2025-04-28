
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronRight } from 'lucide-react';

interface RegisterFormProps {
  isLoading: boolean;
  onSubmit: (
    username: string, 
    password: string,
    confirmPassword: string,
    userType: 'renter' | 'provider',
    inviteCode: string,
    agreeTerms: boolean
  ) => Promise<void>;
}

const RegisterForm = ({ isLoading, onSubmit }: RegisterFormProps) => {
  const [formData, setFormData] = useState({
    username: '',
    inviteCode: '', 
    password: '',
    confirmPassword: '',
    userType: 'renter' as 'renter' | 'provider',
  });
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(
      formData.username,
      formData.password,
      formData.confirmPassword,
      formData.userType,
      formData.inviteCode,
      agreeTerms
    );
  };

  const handleUserTypeChange = (type: 'renter' | 'provider') => {
    setFormData((prev) => ({
      ...prev,
      userType: type
    }));
  };

  const handleAgreeTermsChange = () => {
    setAgreeTerms(!agreeTerms);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="register-username" className="text-sm font-medium">AGI账户</Label>
        <Input 
          id="register-username" 
          placeholder="创建您的AGI账户" 
          className="h-10 sm:h-12"
          value={formData.username}
          onChange={(e) => setFormData({...formData, username: e.target.value})}
          required
        />
      </div>
      
      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="invite-code" className="text-sm font-medium">激活码</Label>
        <Input 
          id="invite-code" 
          placeholder="请输入激活码（可选）" 
          className="h-10 sm:h-12"
          value={formData.inviteCode}
          onChange={(e) => setFormData({...formData, inviteCode: e.target.value})}
        />
        <p className="text-xs text-muted-foreground">使用激活码注册可获得额外奖励</p>
      </div>
      
      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="register-password" className="text-sm font-medium">秘钥</Label>
        <Input 
          id="register-password" 
          type="password" 
          placeholder="创建您的秘钥" 
          className="h-10 sm:h-12"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          required
        />
      </div>
      
      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="register-confirm-password" className="text-sm font-medium">确认秘钥</Label>
        <Input 
          id="register-confirm-password" 
          type="password" 
          placeholder="再次输入您的秘钥" 
          className="h-10 sm:h-12"
          value={formData.confirmPassword}
          onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
          required
        />
      </div>
      
      <div className="space-y-1.5 sm:space-y-2">
        <Label className="text-sm font-medium">您是?</Label>
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          <button
            type="button"
            className={`w-full h-10 sm:h-12 rounded-xl px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-colors touch-target ${
              formData.userType === 'renter' 
                ? 'bg-primary text-primary-foreground shadow-sm' 
                : 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
            }`}
            onClick={() => handleUserTypeChange('renter')}
          >
            租赁者
          </button>
          <button
            type="button"
            className={`w-full h-10 sm:h-12 rounded-xl px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-colors touch-target ${
              formData.userType === 'provider' 
                ? 'bg-primary text-primary-foreground shadow-sm' 
                : 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
            }`}
            onClick={() => handleUserTypeChange('provider')}
          >
            出租者
          </button>
        </div>
      </div>
      
      <div className="flex items-center space-x-2 mt-2">
        <input 
          type="checkbox"
          id="terms"
          checked={agreeTerms}
          onChange={handleAgreeTermsChange}
          className="h-5 w-5 rounded-md border border-primary/70 shadow-sm transition-all focus:ring-2 focus:ring-primary touch-target"
        />
        <Label
          htmlFor="terms"
          className="text-xs sm:text-sm text-muted-foreground cursor-pointer"
          onClick={handleAgreeTermsChange}
        >
          我同意
          <Link to="/terms" className="text-primary hover:underline"> 服务条款 </Link>
          和
          <Link to="/privacy" className="text-primary hover:underline"> 隐私政策</Link>
        </Label>
      </div>
      
      <Button 
        type="submit" 
        className="w-full h-11 sm:h-12 mt-2 rounded-xl shadow-md hover:shadow-lg transition-all font-medium text-base touch-target"
        disabled={isLoading}
      >
        {isLoading ? "注册中..." : (
          <span className="flex items-center justify-center">
            创建账户
            <ChevronRight className="ml-2 h-5 w-5" />
          </span>
        )}
      </Button>
    </form>
  );
};

export default RegisterForm;
