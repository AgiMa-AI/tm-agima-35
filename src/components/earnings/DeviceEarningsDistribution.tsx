
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BarChart } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

const deviceEarningsData = [
  { name: '手机', value: 15 },
  { name: 'CPU服务器', value: 25 },
  { name: 'GPU服务器', value: 60 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const DeviceEarningsDistribution = () => {
  return (
    <Card>
      <CardHeader className="bg-muted/30">
        <CardTitle className="flex items-center text-lg">
          <BarChart className="h-5 w-5 mr-2 text-primary" />
          设备收益分布
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={deviceEarningsData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {deviceEarningsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, '占比']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 space-y-2">
          {deviceEarningsData.map((entry, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                <span className="text-sm">{entry.name}</span>
              </div>
              <span className="text-sm font-medium">{entry.value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DeviceEarningsDistribution;
