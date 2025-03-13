
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const BillDownload = () => {
  return (
    <Card className="shadow-sm hover:shadow transition-shadow duration-200">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="flex items-center text-base sm:text-lg">
          <Download className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-primary" />
          账单下载
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4 sm:p-6 pt-0">
        <div className="space-y-2 sm:space-y-4">
          <Button variant="outline" className="w-full justify-between text-sm h-10">
            <span>2023年5月账单</span>
            <Download className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
          
          <Button variant="outline" className="w-full justify-between text-sm h-10">
            <span>2023年4月账单</span>
            <Download className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
          
          <Button variant="outline" className="w-full justify-between text-sm h-10">
            <span>2023年3月账单</span>
            <Download className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BillDownload;
