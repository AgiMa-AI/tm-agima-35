
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Receipt } from 'lucide-react';

const BillingStatus = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">账单状态</CardTitle>
        <CardDescription>当前付款状态</CardDescription>
      </CardHeader>
      <CardContent>
        <Badge className="bg-green-500 mb-2">已付清</Badge>
        <p className="text-sm text-muted-foreground">
          上次支付: 2023-12-01
        </p>
        <div className="mt-3">
          <Button variant="outline" size="sm">
            <Receipt className="h-4 w-4 mr-2" />
            账单历史
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BillingStatus;
