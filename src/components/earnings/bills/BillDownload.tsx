
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Download } from 'lucide-react';
import BillList from './BillList';

const billPeriods = [
  '2023年5月',
  '2023年4月',
  '2023年3月'
];

const BillDownload = () => {
  return (
    <Card className="shadow-sm hover:shadow transition-shadow duration-200">
      <CardHeader className="p-3 sm:p-6">
        <CardTitle className="flex items-center text-base sm:text-lg">
          <Download className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-primary" />
          账单下载
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-3 sm:p-6 pt-0">
        <BillList periods={billPeriods} />
      </CardContent>
    </Card>
  );
};

export default BillDownload;
