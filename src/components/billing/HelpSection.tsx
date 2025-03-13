
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wallet, Receipt, CreditCard } from 'lucide-react';

const HelpSection = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>需要帮助？</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Button variant="ghost" className="w-full justify-start">
            <Wallet className="h-4 w-4 mr-2" />
            账单问题
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Receipt className="h-4 w-4 mr-2" />
            申请发票
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <CreditCard className="h-4 w-4 mr-2" />
            支付帮助
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HelpSection;
