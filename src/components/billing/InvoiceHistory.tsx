
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

const InvoiceHistory = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>发票</CardTitle>
            <CardDescription>查看和下载您的发票</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>发票号</TableHead>
              <TableHead>时间段</TableHead>
              <TableHead>金额</TableHead>
              <TableHead>状态</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>INV-2023-12</TableCell>
              <TableCell>2023年12月</TableCell>
              <TableCell>¥278.25</TableCell>
              <TableCell>
                <Badge className="bg-blue-500">处理中</Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>INV-2023-11</TableCell>
              <TableCell>2023年11月</TableCell>
              <TableCell>¥412.75</TableCell>
              <TableCell>
                <Badge className="bg-green-500">已支付</Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>INV-2023-10</TableCell>
              <TableCell>2023年10月</TableCell>
              <TableCell>¥356.50</TableCell>
              <TableCell>
                <Badge className="bg-green-500">已支付</Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default InvoiceHistory;
