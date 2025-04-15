
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import AuthLayout from '@/components/auth/AuthLayout';
import RegisterForm from '@/components/auth/RegisterForm';
import { useAuth } from '@/hooks/useAuth';

const Register = () => {
  const navigate = useNavigate();
  const { register, isLoading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

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
        `${username}@example.com`, // Simple email based on username
        password, 
        userType,
        inviteCode
      );
      
      if (success) {
        navigate('/');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="注册账户"
      description="创建您的账户以使用算力 AGI租赁服务"
    >
      <RegisterForm 
        isLoading={isLoading || authLoading}
        onSubmit={handleRegisterSubmit}
      />
    </AuthLayout>
  );
};

export default Register;
