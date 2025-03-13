
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const PromoCode = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>优惠码</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <input
            type="text"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            placeholder="输入优惠码"
          />
          <Button>应用</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PromoCode;
