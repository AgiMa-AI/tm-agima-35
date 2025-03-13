
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BarChart } from 'lucide-react';
import EarningsPieChart from './EarningsPieChart';
import EarningsLegend from './EarningsLegend';

const deviceEarningsData = [
  { name: '手机', value: 15 },
  { name: 'CPU服务器', value: 25 },
  { name: 'GPU服务器', value: 60 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const DeviceEarningsDistribution = () => {
  return (
    <Card className="shadow-sm hover:shadow transition-shadow duration-200">
      <CardHeader className="p-3 sm:p-4 bg-muted/30">
        <CardTitle className="flex items-center text-base sm:text-lg">
          <BarChart className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-primary" />
          设备收益分布
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-3 sm:p-4 pt-2 sm:pt-4">
        <EarningsPieChart data={deviceEarningsData} colors={COLORS} />
        <EarningsLegend data={deviceEarningsData} colors={COLORS} />
      </CardContent>
    </Card>
  );
};

export default DeviceEarningsDistribution;
