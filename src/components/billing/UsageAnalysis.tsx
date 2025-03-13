
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

const UsageAnalysis = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>消费分析</CardTitle>
        <CardDescription>按实例类型和使用方式分析</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px] flex items-center justify-center bg-muted rounded-md">
        <div className="flex items-center gap-2 text-muted-foreground">
          <BarChart3 className="h-5 w-5" />
          <span>消费分析图表将在这里显示</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default UsageAnalysis;
