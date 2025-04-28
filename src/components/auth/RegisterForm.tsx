
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, User, Key, ChevronRight, Mail, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface RegisterFormProps {
  isLoading: boolean;
  onSubmit: (username: string, password: string, confirmPassword: string, userType: 'renter' | 'provider', inviteCode: string, agreeTerms: boolean) => Promise<void>;
  isChineseLanguage?: boolean;
}

const RegisterForm = ({ isLoading, onSubmit, isChineseLanguage = true }: RegisterFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    userType: 'renter' as 'renter' | 'provider',
    inviteCode: '',
    agreeTerms: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(
      formData.username,
      formData.password,
      formData.confirmPassword,
      formData.userType,
      formData.inviteCode,
      formData.agreeTerms
    );
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Text translations based on language
  const usernameLabel = isChineseLanguage ? "AGI账户" : "AGI Account";
  const usernamePlaceholder = isChineseLanguage ? "输入您的AGI账户" : "Enter your AGI account";
  const passwordLabel = isChineseLanguage ? "秘钥" : "Secret Key";
  const passwordPlaceholder = isChineseLanguage ? "输入您的秘钥" : "Enter your secret key";
  const confirmPasswordLabel = isChineseLanguage ? "确认秘钥" : "Confirm Secret Key";
  const confirmPasswordPlaceholder = isChineseLanguage ? "再次输入您的秘钥" : "Re-enter your secret key";
  const userTypeLabel = isChineseLanguage ? "用户类型" : "User Type";
  const renterLabel = isChineseLanguage ? "租户" : "Renter";
  const providerLabel = isChineseLanguage ? "提供者" : "Provider";
  const inviteCodeLabel = isChineseLanguage ? "邀请码" : "Invitation Code";
  const inviteCodePlaceholder = isChineseLanguage ? "输入邀请码（可选）" : "Enter invitation code (optional)";
  const agreeTermsLabel = isChineseLanguage ? "我同意" : "I agree to the";
  const termsLabel = isChineseLanguage ? "服务条款" : "Terms of Service";
  const andLabel = isChineseLanguage ? "和" : "and";
  const privacyLabel = isChineseLanguage ? "隐私政策" : "Privacy Policy";
  const registerButtonLabel = isChineseLanguage ? "注册" : "Register";
  const loadingLabel = isChineseLanguage ? "注册中..." : "Registering...";

  return (
    <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="reg-username" className="text-sm font-medium">{usernameLabel}</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="reg-username"
            placeholder={usernamePlaceholder}
            className="pl-10"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            required
          />
        </div>
      </div>
      
      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="reg-password" className="text-sm font-medium">{passwordLabel}</Label>
        <div className="relative">
          <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="reg-password"
            type={showPassword ? "text" : "password"}
            placeholder={passwordPlaceholder}
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
      
      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="reg-confirm-password" className="text-sm font-medium">{confirmPasswordLabel}</Label>
        <div className="relative">
          <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="reg-confirm-password"
            type={showConfirmPassword ? "text" : "password"}
            placeholder={confirmPasswordPlaceholder}
            className="pl-10 pr-10"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            required
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground touch-target"
            onClick={toggleConfirmPasswordVisibility}
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
      
      <div className="space-y-1.5 sm:space-y-2">
        <Label className="text-sm font-medium">{userTypeLabel}</Label>
        <RadioGroup
          value={formData.userType}
          onValueChange={(value) => setFormData({...formData, userType: value as 'renter' | 'provider'})}
          className="grid grid-cols-2 gap-4"
        >
          <div className={cn(
            "flex items-center justify-center border border-input rounded-lg p-3 transition-colors hover:bg-accent",
            formData.userType === 'renter' && "bg-accent"
          )}>
            <RadioGroupItem value="renter" id="renter" className="sr-only" />
            <Label htmlFor="renter" className="cursor-pointer flex items-center justify-center w-full">
              {renterLabel}
            </Label>
          </div>
          <div className={cn(
            "flex items-center justify-center border border-input rounded-lg p-3 transition-colors hover:bg-accent",
            formData.userType === 'provider' && "bg-accent"
          )}>
            <RadioGroupItem value="provider" id="provider" className="sr-only" />
            <Label htmlFor="provider" className="cursor-pointer flex items-center justify-center w-full">
              {providerLabel}
            </Label>
          </div>
        </RadioGroup>
      </div>
      
      <div className="space-y-1.5 sm:space-y-2">
        <Label htmlFor="invite-code" className="text-sm font-medium">{inviteCodeLabel}</Label>
        <div className="relative">
          <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="invite-code"
            placeholder={inviteCodePlaceholder}
            className="pl-10"
            value={formData.inviteCode}
            onChange={(e) => setFormData({...formData, inviteCode: e.target.value})}
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-2 mt-2">
        <Checkbox
          id="terms"
          checked={formData.agreeTerms}
          onCheckedChange={(checked) => setFormData({...formData, agreeTerms: checked as boolean})}
        />
        <label
          htmlFor="terms"
          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {agreeTermsLabel}{" "}
          <Link to="/terms" className="text-primary hover:underline">
            {termsLabel}
          </Link>{" "}
          {andLabel}{" "}
          <Link to="/privacy" className="text-primary hover:underline">
            {privacyLabel}
          </Link>
        </label>
      </div>
      
      <Button
        type="submit"
        className="w-full h-11 sm:h-12 mt-2 rounded-xl shadow-md hover:shadow-lg transition-all font-medium text-base"
        disabled={isLoading}
      >
        {isLoading ? loadingLabel : (
          <span className="flex items-center justify-center">
            {registerButtonLabel}
            <ChevronRight className="ml-2 h-5 w-5" />
          </span>
        )}
      </Button>
    </form>
  );
};

export default RegisterForm;
