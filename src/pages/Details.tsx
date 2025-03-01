
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import InstanceDetails from '@/components/dashboard/InstanceDetails';
import { useInstances } from '@/hooks/useInstances';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getInstance } = useInstances();
  
  const instance = getInstance(id!);
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  if (!instance) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <h2 className="text-2xl font-bold mb-2">未找到实例</h2>
          <p className="text-muted-foreground mb-6">
            您寻找的实例不存在或已被移除。
          </p>
          <Button onClick={handleGoBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回
          </Button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <Button 
            variant="ghost" 
            className="mb-4 pl-1" 
            onClick={handleGoBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回实例列表
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">{instance.name}</h1>
          <p className="text-muted-foreground mt-1">
            详细信息和租用选项
          </p>
        </div>
        
        <InstanceDetails instance={instance} />
      </div>
    </Layout>
  );
};

export default Details;
