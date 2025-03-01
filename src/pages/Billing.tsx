
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  AlertCircle, 
  BarChart3, 
  CreditCard, 
  Download, 
  FileText, 
  PlusCircle, 
  Receipt, 
  RefreshCw, 
  Wallet 
} from 'lucide-react';

const Billing = () => {
  const currentBalance = 348.75;
  const monthlySpending = 278.25;
  
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">账单与支付</h1>
          <p className="text-muted-foreground mt-1">
            管理您的账单、余额和支付方式
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">账户余额</CardTitle>
              <CardDescription>可用于新租用</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <p className="text-3xl font-bold">¥{currentBalance.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground ml-2">CNY</p>
              </div>
              <div className="mt-3">
                <Button>充值</Button>
              </div>
            </CardContent>
          </Card>
          
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
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">账单状态</CardTitle>
              <CardDescription>当前付款状态</CardDescription>
            </CardHeader>
            <CardContent>
              <Badge className="bg-green-500 mb-2">已付清</Badge>
              <p className="text-sm text-muted-foreground">
                上次支付: 2023-12-01
              </p>
              <div className="mt-3">
                <Button variant="outline" size="sm">
                  <Receipt className="h-4 w-4 mr-2" />
                  账单历史
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Tabs defaultValue="transactions">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="transactions">交易历史</TabsTrigger>
                <TabsTrigger value="invoices">发票</TabsTrigger>
                <TabsTrigger value="usage">使用分析</TabsTrigger>
              </TabsList>
              
              <TabsContent value="transactions" className="mt-6">
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
              </TabsContent>
              
              <TabsContent value="invoices" className="mt-6">
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
              </TabsContent>
              
              <TabsContent value="usage" className="mt-6">
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
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>支付方式</CardTitle>
                <CardDescription>管理您的付款选项</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border p-3">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">**** **** **** 4242</p>
                      <p className="text-xs text-muted-foreground">
                        有效期至 12/25
                      </p>
                    </div>
                    <Badge className="ml-auto">默认</Badge>
                  </div>
                </div>
                
                <Button className="w-full" variant="outline">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  添加支付方式
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>自动充值</CardTitle>
                <CardDescription>当账户余额不足时</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">启用自动充值</p>
                    <p className="text-sm text-muted-foreground">
                      当余额低于 ¥100 时自动充值 ¥500
                    </p>
                  </div>
                  <Button variant="outline" size="sm">设置</Button>
                </div>
                
                <Separator />
                
                <div className="rounded-md bg-yellow-50 p-3 border border-yellow-200">
                  <div className="flex items-start">
                    <AlertCircle className="h-4 w-4 text-yellow-800 mt-0.5 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-yellow-800">余额提醒</p>
                      <p className="text-xs text-yellow-700 mt-1">
                        当您的账户余额低于 ¥200 时，我们将通过电子邮件提醒您。
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
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
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>需要帮助？</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    <Wallet className="h-4 w-4 mr-2" />
                    账单问题
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <Receipt className="h-4 w-4 mr-2" />
                    申请发票
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <CreditCard className="h-4 w-4 mr-2" />
                    支付帮助
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Billing;
