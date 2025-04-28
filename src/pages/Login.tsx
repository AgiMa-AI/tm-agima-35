
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import AuthLayout from '@/components/auth/AuthLayout';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import CurrentUser from '@/components/auth/CurrentUser';
import LanguageDialog from '@/components/auth/LanguageDialog';

const Login = () => {
  const navigate = useNavigate();
  const { login, register, isLoading: authLoading, user, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const [showLanguageDialog, setShowLanguageDialog] = useState(false);
  const [isChineseLanguage, setIsChineseLanguage] = useState(true);

  useEffect(() => {
    // Check if user has already made a language choice
    const languagePref = localStorage.getItem('languagePreference');
    
    if (languagePref === null) {
      // First visit, show language dialog after animation
      const timer = setTimeout(() => {
        setAnimationCompleted(true);
        setShowLanguageDialog(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // User has already chosen language preference
      setIsChineseLanguage(languagePref === 'zh');
      setAnimationCompleted(true);
    }
  }, []);

  const handleSelectChinese = () => {
    localStorage.setItem('languagePreference', 'zh');
    setIsChineseLanguage(true);
    setShowLanguageDialog(false);
  };

  const handleSelectEnglish = () => {
    localStorage.setItem('languagePreference', 'en');
    setIsChineseLanguage(false);
    setShowLanguageDialog(false);
  };

  const handleLoginSubmit = async (username: string, password: string) => {
    setIsLoading(true);
    
    try {
      const success = await login(username, password);
      if (success) {
        navigate('/');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (
    username: string,
    password: string,
    confirmPassword: string,
    userType: 'renter' | 'provider',
    inviteCode: string,
    agreeTerms: boolean
  ) => {
    if (!agreeTerms) {
      toast({
        title: isChineseLanguage ? "请同意服务条款和隐私政策" : "Please agree to terms and privacy policy",
        description: isChineseLanguage 
          ? "您需要同意服务条款和隐私政策才能继续" 
          : "You need to agree to the terms and privacy policy to continue",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: isChineseLanguage ? "秘钥不匹配" : "Keys do not match",
        description: isChineseLanguage ? "请确保两次输入的秘钥相同" : "Please ensure both keys are identical",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await register(
        username, 
        `${username}@agima.io`, // 使用用户名作为邮箱前缀
        password, 
        userType,
        inviteCode // 传递激活码
      );
      
      if (success) {
        navigate('/');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwitchAccount = () => {
    logout();
    toast({
      title: isChineseLanguage ? "已切换账号" : "Account switched",
      description: isChineseLanguage ? "请使用新的账号登录" : "Please login with a new account",
    });
  };

  if (!animationCompleted) {
    return <div className="min-h-screen bg-gradient-to-b from-secondary/50 to-background" />;
  }

  // Determine tab labels based on language choice
  const loginLabel = isChineseLanguage ? "登录" : "Login";
  const registerLabel = isChineseLanguage ? "注册" : "Register";

  return (
    <AuthLayout 
      title={isChineseLanguage ? "欢迎使用 算力 AGI租赁" : "Welcome to Compute AGI Rental"}
      description={isChineseLanguage ? "登录您的账户以继续使用服务" : "Login to your account to continue"}
    >
      <LanguageDialog
        isOpen={showLanguageDialog}
        onClose={() => setShowLanguageDialog(false)}
        onSelectChinese={handleSelectChinese}
        onSelectEnglish={handleSelectEnglish}
      />
      
      {user ? (
        <CurrentUser user={user} onSwitchAccount={handleSwitchAccount} />
      ) : (
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-5 rounded-xl overflow-hidden bg-muted/70 p-1">
            <TabsTrigger value="login" className="rounded-lg py-2.5">{loginLabel}</TabsTrigger>
            <TabsTrigger value="register" className="rounded-lg py-2.5">{registerLabel}</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <LoginForm 
              isLoading={isLoading || authLoading}
              onSubmit={handleLoginSubmit}
              isChineseLanguage={isChineseLanguage}
            />
          </TabsContent>
          
          <TabsContent value="register">
            <RegisterForm 
              isLoading={isLoading || authLoading}
              onSubmit={handleRegisterSubmit}
            />
          </TabsContent>
        </Tabs>
      )}
    </AuthLayout>
  );
};

export default Login;
