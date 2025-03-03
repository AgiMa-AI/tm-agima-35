
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, ArrowRight } from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      <div className="container py-6">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">算力云平台</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            全球分布式计算资源，为AI模型提供高效、稳定的算力支持
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>高性能计算</CardTitle>
              <CardDescription>
                利用分布式GPU/TPU集群提供高性能计算能力
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>支持各类深度学习模型训练与推理，弹性扩展，按需付费</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>AGI模型市场</CardTitle>
              <CardDescription>
                一站式访问主流大语言模型和AI服务
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>集成OpenAI、Anthropic、Stability AI等厂商的先进AI模型</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>算力共享网络</CardTitle>
              <CardDescription>
                将闲置算力接入网络，获取额外收益
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>安全可靠的P2P算力共享机制，助力构建去中心化的全球算力网络</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center mb-12">
          <Button asChild size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600">
            <Link to="/admin/dashboard">
              <Shield className="mr-2 h-5 w-5" />
              进入管理后台
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <p className="mt-2 text-sm text-muted-foreground">
            查看完整的平台管理功能和数据分析
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
