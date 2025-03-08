
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
    <Card>
      <CardHeader className="bg-muted/30">
        <CardTitle className="flex items-center text-lg">
          <CreditCard className="h-5 w-5 mr-2 text-primary" />
          费用预估
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">租赁方案</span>
              <span className="font-medium">按天租赁</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              {resourceType === 'gpu' ? (
                <>
                  <span className="text-sm font-medium">GPU 数量</span>
                  <span className="font-medium">{resourceCount} × A100 80GB</span>
                </>
              ) : (
                <>
                  <span className="text-sm font-medium">CPU 核心数</span>
                  <span className="font-medium">{resourceCount} 核心</span>
                </>
              )}
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">租赁时长</span>
              <span className="font-medium">{leaseDays} 天</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">单价</span>
              {resourceType === 'gpu' ? (
                <span className="font-medium">¥980 / 天</span>
              ) : (
                <span className="font-medium">¥120 / 天</span>
              )}
            </div>
            
            <Separator className="my-4" />
            
            <div className="flex items-center justify-between">
              <span className="text-base font-medium">总计费用</span>
              <span className="text-xl font-bold text-primary">¥{totalCost}</span>
            </div>
          </div>
          
          <Button onClick={onLease} className="w-full">
            确认租赁
          </Button>
          
          <div className="text-xs text-muted-foreground">
            <p className="mb-1">点击确认后将引导您完成支付流程。支付完成后，我们会通过您的注册邮箱发送SSH密钥和使用说明。</p>
            <p>如有任何问题，请联系我们的客服团队获取支持。</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CostEstimate;
