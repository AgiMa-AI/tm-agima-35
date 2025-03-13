
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw } from 'lucide-react';

const TransactionHistory = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>交易历史</CardTitle>
            <CardDescription>近期支付和充值记录</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              导出
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              刷新
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>日期</TableHead>
              <TableHead>描述</TableHead>
              <TableHead>金额</TableHead>
              <TableHead>状态</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>2023-12-15</TableCell>
              <TableCell>账户充值</TableCell>
              <TableCell className="text-green-600">+¥500.00</TableCell>
              <TableCell>
                <Badge className="bg-green-500">成功</Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2023-12-10</TableCell>
              <TableCell>实例使用: High-Performance RTX Node</TableCell>
              <TableCell className="text-red-600">-¥28.50</TableCell>
              <TableCell>
                <Badge className="bg-green-500">已结算</Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2023-12-05</TableCell>
              <TableCell>实例使用: ML Optimized Server</TableCell>
              <TableCell className="text-red-600">-¥82.50</TableCell>
              <TableCell>
                <Badge className="bg-green-500">已结算</Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2023-12-01</TableCell>
              <TableCell>账户充值</TableCell>
              <TableCell className="text-green-600">+¥1000.00</TableCell>
              <TableCell>
                <Badge className="bg-green-500">成功</Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2023-11-28</TableCell>
              <TableCell>实例使用: Entry Level Node</TableCell>
              <TableCell className="text-red-600">-¥5.75</TableCell>
              <TableCell>
                <Badge className="bg-green-500">已结算</Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;
