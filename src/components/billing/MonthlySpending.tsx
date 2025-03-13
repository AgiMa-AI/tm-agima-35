
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

interface MonthlySpendingProps {
  monthlySpending: number;
}

const MonthlySpending = ({ monthlySpending }: MonthlySpendingProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">本月消费</CardTitle>
        <CardDescription>截至今日</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline">
          <p className="text-3xl font-bold">¥{monthlySpending.toFixed(2)}</p>
          <p className="text-sm text-muted-foreground ml-2">CNY</p>
        </div>
        <div className="mt-3">
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            查看详情
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlySpending;
