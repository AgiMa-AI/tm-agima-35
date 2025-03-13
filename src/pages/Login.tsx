
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/useAuth';
import AuthLayout from '@/components/auth/AuthLayout';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import CurrentUser from '@/components/auth/CurrentUser';

const Login = () => {
  const navigate = useNavigate();
  const { login, register, isLoading: authLoading, user, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);

  useEffect(() => {
    // 模拟完成初始加载动画
    const timer = setTimeout(() => {
      setAnimationCompleted(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

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
        title: "请同意服务条款和隐私政策",
        description: "您需要同意服务条款和隐私政策才能继续",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "密码不匹配",
        description: "请确保两次输入的密码相同",
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
        inviteCode // 传递邀请码
      );
      
      if (success) {
        // 导航到主页
        navigate('/');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwitchAccount = () => {
    logout();
    toast({
      title: "已切换账号",
      description: "请使用新的账号登录",
    });
  };

  if (!animationCompleted) {
    return <div className="min-h-screen bg-gradient-to-b from-secondary/50 to-background" />; // 简单的加载页面
  }

  return (
    <AuthLayout 
      title="欢迎使用 算力 AGI租赁"
      description="登录您的账户以继续使用服务"
    >
      {user ? (
        <CurrentUser user={user} onSwitchAccount={handleSwitchAccount} />
      ) : (
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-5 rounded-xl overflow-hidden bg-muted/70 p-1">
            <TabsTrigger value="login" className="rounded-lg py-2.5">登录</TabsTrigger>
            <TabsTrigger value="register" className="rounded-lg py-2.5">注册</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <LoginForm 
              isLoading={isLoading || authLoading}
              onSubmit={handleLoginSubmit}
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
