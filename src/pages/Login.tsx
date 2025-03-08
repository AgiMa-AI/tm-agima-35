
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, EyeOff, User, Key, Mail, Lock } from 'lucide-react';
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
          description: "欢迎加入腾目科技",
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
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center overflow-hidden">
      {/* Left side - Gradient Background with Logo */}
      <div className="hidden md:flex md:w-1/2 h-full bg-tiffany-gradient items-center justify-center p-8">
        <div className="max-w-md text-white flex flex-col items-center">
          <div className="w-full max-w-xs animate-float mb-8">
            <img 
              src="/floating-device.apng" 
              alt="Floating Device" 
              className="w-full h-auto drop-shadow-2xl"
            />
          </div>
          <h1 className="text-4xl font-bold mb-3">腾目科技</h1>
          <p className="text-white/90 text-lg mb-4 text-center">
            打破界限，创造未来
          </p>
          <div className="mt-6 p-4 bg-white/10 backdrop-blur-md rounded-xl">
            <p className="text-white italic">
              "所有伟大的创新 都是对现状'不合理'的拆解"
            </p>
            <p className="text-white/80 text-sm mt-1">
              All great innovations are a dismantling of the status quo that is 'unreasonable.'
            </p>
          </div>
        </div>
      </div>
      
      {/* Mobile header - visible only on small screens */}
      <div className="w-full md:hidden bg-tiffany-gradient p-6 text-center">
        <div className="w-40 h-40 mx-auto animate-float my-4">
          <img 
            src="/floating-device.apng" 
            alt="Floating Device" 
            className="w-full h-auto drop-shadow-xl"
          />
        </div>
        <h1 className="text-3xl font-bold text-white mb-1">腾目科技</h1>
        <p className="text-white/80 text-sm italic mb-2">
          "所有伟大的创新 都是对现状'不合理'的拆解"
        </p>
      </div>
      
      {/* Right side - Login Form */}
      <div className="w-full md:w-1/2 bg-white md:h-full p-6 flex items-center justify-center">
        <Card className="w-full max-w-md shadow-xl border-0 overflow-hidden">
          <div className="h-2 bg-tiffany-gradient w-full"></div>
          <CardHeader className="space-y-1 pt-6">
            <CardTitle className="text-2xl font-bold text-center">欢迎回来</CardTitle>
            <CardDescription className="text-center">
              登录您的账户以继续
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pb-3">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">登录</TabsTrigger>
                <TabsTrigger value="register">注册</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">用户名</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input 
                        id="username" 
                        placeholder="输入您的用户名" 
                        className="pl-10 h-12 text-base"
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
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input 
                        id="password" 
                        type={showPassword ? "text" : "password"} 
                        placeholder="输入您的密码"
                        className="pl-10 pr-10 h-12 text-base"
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
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full h-12 text-base bg-tiffany-gradient hover:opacity-95 transition-all"
                    disabled={isLoading || authLoading}
                  >
                    {isLoading ? "登录中..." : "登录"}
                  </Button>
                  
                  <div className="text-center mt-6">
                    <p className="text-sm text-muted-foreground">
                      默认管理员账号: admin / admin
                    </p>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="register">
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-username">用户名</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input 
                        id="register-username" 
                        placeholder="创建您的用户名" 
                        className="pl-10 h-12 text-base"
                        value={registerForm.username}
                        onChange={(e) => setRegisterForm({...registerForm, username: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="invite-code">邀请码</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input 
                        id="invite-code" 
                        placeholder="请输入您的邀请码" 
                        className="pl-10 h-12 text-base"
                        value={registerForm.inviteCode}
                        onChange={(e) => setRegisterForm({...registerForm, inviteCode: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-password">密码</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input 
                        id="register-password" 
                        type="password" 
                        placeholder="创建您的密码" 
                        className="pl-10 h-12 text-base"
                        value={registerForm.password}
                        onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-confirm-password">确认密码</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input 
                        id="register-confirm-password" 
                        type="password" 
                        placeholder="再次输入您的密码" 
                        className="pl-10 h-12 text-base"
                        value={registerForm.confirmPassword}
                        onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="user-type">您是?</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        type="button"
                        variant={registerForm.userType === 'renter' ? 'default' : 'outline'}
                        className={`w-full h-12 ${registerForm.userType === 'renter' ? 'bg-tiffany-gradient' : ''}`}
                        onClick={() => setRegisterForm({...registerForm, userType: 'renter'})}
                      >
                        租赁者
                      </Button>
                      <Button
                        type="button"
                        variant={registerForm.userType === 'provider' ? 'default' : 'outline'}
                        className={`w-full h-12 ${registerForm.userType === 'provider' ? 'bg-tiffany-gradient' : ''}`}
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
                    className="w-full h-12 text-base bg-tiffany-gradient hover:opacity-95 transition-all"
                    disabled={isLoading || authLoading}
                  >
                    {isLoading ? "注册中..." : "创建账户"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4 pb-6 pt-2">
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
