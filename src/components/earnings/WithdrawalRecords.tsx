
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard } from 'lucide-react';

const withdrawalData = [
  { 
    id: 'WD-5678', 
    time: '2023-05-05 14:30', 
    amount: 500, 
    status: 'completed', 
    method: '支付宝' 
  },
  { 
    id: 'WD-5679', 
    time: '2023-05-01 08:15', 
    amount: 1000, 
    status: 'completed', 
    method: '银行卡' 
  },
  { 
    id: 'WD-5680', 
    time: '2023-04-25 22:45', 
    amount: 300, 
    status: 'completed', 
    method: '微信' 
  },
];

const WithdrawalRecords = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <CreditCard className="h-5 w-5 mr-2 text-primary" />
          提现记录
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {withdrawalData.map((withdrawal) => (
            <div key={withdrawal.id} className="flex justify-between items-center p-3 bg-muted/10 rounded-lg border">
              <div>
                <p className="font-medium">{withdrawal.id}</p>
                <p className="text-xs text-muted-foreground">{withdrawal.time}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary">¥{withdrawal.amount}</p>
                <p className="text-xs">{withdrawal.method}</p>
              </div>
            </div>
          ))}
          
          <Button className="w-full mt-2">
            申请提现
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WithdrawalRecords;
