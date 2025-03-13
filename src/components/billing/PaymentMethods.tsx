
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CreditCard, PlusCircle } from 'lucide-react';

const PaymentMethods = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>支付方式</CardTitle>
        <CardDescription>管理您的付款选项</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg border p-3">
          <div className="flex items-center space-x-3">
            <CreditCard className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">**** **** **** 4242</p>
              <p className="text-xs text-muted-foreground">
                有效期至 12/25
              </p>
            </div>
            <Badge className="ml-auto">默认</Badge>
          </div>
        </div>
        
        <Button className="w-full" variant="outline">
          <PlusCircle className="h-4 w-4 mr-2" />
          添加支付方式
        </Button>
      </CardContent>
    </Card>
  );
};

export default PaymentMethods;
