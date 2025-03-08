
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, EyeOff, User, Key } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/useAuth';

const Login = () => {
  const navigate = useNavigate();
  const { login, register, isLoading: authLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  });
  const [registerForm, setRegisterForm] = useState({
    username: '',
    inviteCode: '',
    password: '',
    confirmPassword: '',
    userType: 'renter', // 默认为租赁者
  });

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(loginForm.username, loginForm.password);
      if (success) {
        navigate('/');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerForm.password !== registerForm.confirmPassword) {
      toast({
        title: "密码不匹配",
        description: "请确保两次输入的密码相同",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // 邀请码用作email的替代
      const success = await register(
        registerForm.username, 
        registerForm.inviteCode + "@agima.io", // 使用邀请码作为临时email域
        registerForm.password, 
        registerForm.userType as 'renter' | 'provider'
      );
      
      if (success) {
        toast({
          title: "注册成功",
          description: "欢迎加入 Agi-Ma 平台",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary">腾目科技</h1>
          <p className="text-muted-foreground mt-3 italic max-w-xs mx-auto">
            "所有伟大的创新 都是对现状'不合理'的拆解"
          </p>
          <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto">
            All great innovations are a dismantling of the status quo that is 'unreasonable.'
          </p>
        </div>
        
        <Card className="w-full shadow-lg border-primary/20 animate-fade-in">
          <CardHeader className="space-y-1 px-4 py-5 sm:px-6">
            <CardTitle className="text-xl text-center">欢迎使用</CardTitle>
            <CardDescription className="text-center">
              登录您的账户以继续使用服务
            </CardDescription>
          </CardHeader>
          
          <CardContent className="px-4 sm:px-6">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="login">登录</TabsTrigger>
                <TabsTrigger value="register">注册</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">用户名</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="username" 
                        placeholder="输入您的用户名" 
                        className="pl-10"
                        value={loginForm.username}
                        onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">密码</Label>
                      <Link 
                        to="/forgot-password" 
                        className="text-sm text-primary hover:underline"
                      >
                        忘记密码?
                      </Link>
                    </div>
                    <div className="relative">
                      <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="password" 
                        type={showPassword ? "text" : "password"} 
                        placeholder="输入您的密码"
                        className="pl-10 pr-10"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                        required
                      />
                      <button 
                        type="button"
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
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
                    className="w-full" 
                    disabled={isLoading || authLoading}
                  >
                    {isLoading ? "登录中..." : "登录"}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="register">
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-username">用户名</Label>
                    <Input 
                      id="register-username" 
                      placeholder="创建您的用户名" 
                      value={registerForm.username}
                      onChange={(e) => setRegisterForm({...registerForm, username: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="invite-code">邀请码</Label>
                    <Input 
                      id="invite-code" 
                      placeholder="请输入您的邀请码" 
                      value={registerForm.inviteCode}
                      onChange={(e) => setRegisterForm({...registerForm, inviteCode: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-password">密码</Label>
                    <Input 
                      id="register-password" 
                      type="password" 
                      placeholder="创建您的密码" 
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-confirm-password">确认密码</Label>
                    <Input 
                      id="register-confirm-password" 
                      type="password" 
                      placeholder="再次输入您的密码" 
                      value={registerForm.confirmPassword}
                      onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="user-type">您是?</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        type="button"
                        variant={registerForm.userType === 'renter' ? 'default' : 'outline'}
                        className="w-full"
                        onClick={() => setRegisterForm({...registerForm, userType: 'renter'})}
                      >
                        租赁者
                      </Button>
                      <Button
                        type="button"
                        variant={registerForm.userType === 'provider' ? 'default' : 'outline'}
                        className="w-full"
                        onClick={() => setRegisterForm({...registerForm, userType: 'provider'})}
                      >
                        出租者
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      id="terms"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      required
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm text-muted-foreground"
                    >
                      我同意
                      <a href="#" className="text-primary hover:underline"> 服务条款 </a>
                      和
                      <a href="#" className="text-primary hover:underline"> 隐私政策</a>
                    </label>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading || authLoading}
                  >
                    {isLoading ? "注册中..." : "创建账户"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4 px-4 py-5 sm:px-6">
            <div className="text-xs sm:text-sm text-center text-muted-foreground">
              <span>登录即表示您同意我们的</span>
              <a href="#" className="text-primary hover:underline"> 服务条款 </a>
              <span>和</span>
              <a href="#" className="text-primary hover:underline"> 隐私政策</a>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
