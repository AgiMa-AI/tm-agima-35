
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface AccountBalanceProps {
  currentBalance: number;
}

const AccountBalance = ({ currentBalance }: AccountBalanceProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">账户余额</CardTitle>
        <CardDescription>可用于新租用</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline">
          <p className="text-3xl font-bold">¥{currentBalance.toFixed(2)}</p>
          <p className="text-sm text-muted-foreground ml-2">CNY</p>
        </div>
        <div className="mt-3">
          <Button>充值</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountBalance;
