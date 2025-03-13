
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { AlertCircle } from 'lucide-react';

const AutoRecharge = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>自动充值</CardTitle>
        <CardDescription>当账户余额不足时</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="font-medium">启用自动充值</p>
            <p className="text-sm text-muted-foreground">
              当余额低于 ¥100 时自动充值 ¥500
            </p>
          </div>
          <Button variant="outline" size="sm">设置</Button>
        </div>
        
        <Separator />
        
        <div className="rounded-md bg-yellow-50 p-3 border border-yellow-200">
          <div className="flex items-start">
            <AlertCircle className="h-4 w-4 text-yellow-800 mt-0.5 mr-2" />
            <div>
              <p className="text-sm font-medium text-yellow-800">余额提醒</p>
              <p className="text-xs text-yellow-700 mt-1">
                当您的账户余额低于 ¥200 时，我们将通过电子邮件提醒您。
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AutoRecharge;
