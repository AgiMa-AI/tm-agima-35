
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CreditCard } from 'lucide-react';

interface CostEstimateProps {
  resourceType: string;
  resourceCount: string;
  leaseDays: string;
  totalCost: string;
  onLease: () => void;
}

const CostEstimate = ({
  resourceType,
  resourceCount,
  leaseDays,
  totalCost,
  onLease
}: CostEstimateProps) => {
  return (
    <Card className="border-0 shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="bg-background pb-3">
        <CardTitle className="flex items-center text-lg">
          <CreditCard className="h-5 w-5 mr-2 text-primary" />
          费用预估
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-4">
        <div className="space-y-4">
          <div className="bg-primary/5 p-4 rounded-xl border border-primary/10">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium">租赁方案</span>
              <span className="font-medium text-sm bg-primary/10 px-3 py-1 rounded-full">按天租赁</span>
            </div>
            <div className="flex items-center justify-between mb-3">
              {resourceType === 'gpu' ? (
                <>
                  <span className="text-sm font-medium">GPU 数量</span>
                  <span className="font-medium text-sm">{resourceCount} × A100 80GB</span>
                </>
              ) : (
                <>
                  <span className="text-sm font-medium">CPU 核心数</span>
                  <span className="font-medium text-sm">{resourceCount} 核心</span>
                </>
              )}
            </div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium">租赁时长</span>
              <span className="font-medium text-sm">{leaseDays} 天</span>
            </div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium">单价</span>
              {resourceType === 'gpu' ? (
                <span className="font-medium text-sm">¥980 / 天</span>
              ) : (
                <span className="font-medium text-sm">¥120 / 天</span>
              )}
            </div>
            
            <Separator className="my-3" />
            
            <div className="flex items-center justify-between">
              <span className="text-base font-medium">总计费用</span>
              <span className="text-xl font-bold text-primary">¥{totalCost}</span>
            </div>
          </div>
          
          <Button 
            onClick={onLease} 
            className="w-full rounded-full bg-primary hover:bg-primary/90 text-white font-medium py-6 h-auto"
          >
            确认租赁
          </Button>
          
          <div className="text-xs text-muted-foreground px-1">
            <p className="mb-1">点击确认后将引导您完成支付流程。支付完成后，我们会通过您的注册邮箱发送SSH密钥和使用说明。</p>
            <p>如有任何问题，请联系我们的客服团队获取支持。</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CostEstimate;
