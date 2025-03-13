
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart as RechartsLineChart, Line } from 'recharts';

const earningsData = [
  { date: '05-01', amount: 320 },
  { date: '05-02', amount: 350 },
  { date: '05-03', amount: 410 },
  { date: '05-04', amount: 490 },
  { date: '05-05', amount: 470 },
  { date: '05-06', amount: 520 },
  { date: '05-07', amount: 550 },
  { date: '05-08', amount: 590 },
  { date: '05-09', amount: 610 },
  { date: '05-10', amount: 670 },
];

const EarningsTrends = () => {
  return (
    <Card>
      <CardHeader className="bg-muted/30">
        <CardTitle className="flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-primary" />
          收益趋势
        </CardTitle>
        <CardDescription>
          查看您的算力收益变化趋势
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6">
        <Tabs defaultValue="daily">
          <TabsList className="mb-4">
            <TabsTrigger value="daily">日视图</TabsTrigger>
            <TabsTrigger value="weekly">周视图</TabsTrigger>
            <TabsTrigger value="monthly">月视图</TabsTrigger>
          </TabsList>
          
          <TabsContent value="daily">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={earningsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(140, 140, 140, 0.2)" />
                  <XAxis dataKey="date" stroke="#8884d8" />
                  <YAxis stroke="#8884d8" />
                  <Tooltip 
                    formatter={(value) => [`¥${value}`, '收益']} 
                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '6px' }}
                  />
                  <Legend />
                  <Bar dataKey="amount" name="日收益" fill="#8884d8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="weekly">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={[
                  { week: '第1周', amount: 1800 },
                  { week: '第2周', amount: 2200 },
                  { week: '第3周', amount: 1950 },
                  { week: '第4周', amount: 2400 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(140, 140, 140, 0.2)" />
                  <XAxis dataKey="week" stroke="#8884d8" />
                  <YAxis stroke="#8884d8" />
                  <Tooltip 
                    formatter={(value) => [`¥${value}`, '收益']} 
                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '6px' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="amount" name="周收益" stroke="#8884d8" strokeWidth={2} />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="monthly">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { month: '1月', amount: 5800 },
                  { month: '2月', amount: 6200 },
                  { month: '3月', amount: 7500 },
                  { month: '4月', amount: 7800 },
                  { month: '5月', amount: 4980 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(140, 140, 140, 0.2)" />
                  <XAxis dataKey="month" stroke="#8884d8" />
                  <YAxis stroke="#8884d8" />
                  <Tooltip 
                    formatter={(value) => [`¥${value}`, '收益']} 
                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '6px' }}
                  />
                  <Legend />
                  <Bar dataKey="amount" name="月收益" fill="#8884d8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EarningsTrends;
