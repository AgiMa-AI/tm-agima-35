
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import InstanceCard from '@/components/dashboard/InstanceCard';
import FilterBar from '@/components/dashboard/FilterBar';
import { useInstances } from '@/hooks/useInstances';
import { Server, MessageSquare, CreditCard } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';

const Instances = () => {
  const { 
    instances, 
    filters, 
    updateFilters, 
    resetFilters, 
    loading, 
    filterOptions,
    totalCount,
    filteredCount
  } = useInstances();
  
  const [isRentDialogOpen, setIsRentDialogOpen] = useState(false);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [selectedInstance, setSelectedInstance] = useState<any>(null);
  const [rentalPeriod, setRentalPeriod] = useState(1);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('wechat');
  const { toast } = useToast();
  
  const handleSearch = (query: string) => {
    updateFilters({ search: query || undefined });
  };
  
  const handleFilterChange = (newFilters: any) => {
    updateFilters(newFilters);
  };
  
  const handleRentInstance = (instance: any) => {
    setSelectedInstance(instance);
    setIsRentDialogOpen(true);
  };
  
  const handleRentNow = () => {
    setIsRentDialogOpen(false);
    setIsPaymentDialogOpen(true);
  };
  
  const handlePayment = () => {
    setIsPaymentDialogOpen(false);
    toast({
      title: "付款成功",
      description: `您已成功租用 ${selectedInstance?.name}，时长 ${rentalPeriod} ${rentalPeriod === 1 ? '天' : '天'}`,
    });
  };
  
  const paymentMethods = [
    {
      id: 'wechat',
      name: '微信支付',
      icon: <MessageSquare className="h-4 w-4" />,
    },
    {
      id: 'alipay',
      name: '支付宝',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 9.5C22 5.36 18.64 2 14.5 2h-5C5.36 2 2 5.36 2 9.5v5c0 4.14 3.36 7.5 7.5 7.5h5c4.14 0 7.5-3.36 7.5-7.5v-5Z"/><path d="M18.5 4.5c-1 0-1.5.5-1.5 1.5v4.53L9.5 9M16.53 12h-4.17c-2.95 4.61-4.87 5.5-4.87 5.5h7.04c4 0 5.47-.54 5.47-2.5 0-1.96-1.97-3-3.47-3Z"/></svg>,
    },
    {
      id: 'bank',
      name: '公户转账',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><path d="M6 9h12M6 13h2M6 17h6"/></svg>,
    },
    {
      id: 'unionpay',
      name: '云闪付',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>,
    },
    {
      id: 'quickpay',
      name: '银联快捷',
      icon: <CreditCard className="h-4 w-4" />,
    },
  ];
  
  return (
    <Layout searchHandler={handleSearch}>
      <div className="space-y-4 sm:space-y-6">
        <div className="text-center sm:text-left">
          <h1 className="font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">所有主机实例</h1>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">
            浏览和筛选可用的主机实例
          </p>
        </div>
        
        <FilterBar
          availableFilters={filterOptions}
          activeFilters={filters}
          onFilterChange={handleFilterChange}
          onFilterReset={resetFilters}
        />
        
        <div className="flex items-end justify-between mb-4 flex-wrap gap-2">
          <p className="text-xs sm:text-sm text-muted-foreground w-full sm:w-auto text-center sm:text-left">
            显示 {filteredCount} 个，共 {totalCount} 个实例
          </p>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {Array(8).fill(0).map((_, i) => (
              <div key={i} className="flex flex-col space-y-3">
                <Skeleton className="h-[250px] sm:h-[300px] w-full rounded-xl" />
              </div>
            ))}
          </div>
        ) : instances.length > 0 ? (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {instances.map((instance) => (
              <InstanceCard 
                key={instance.id} 
                instance={instance} 
                onRent={() => handleRentInstance(instance)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 sm:py-8 md:py-12 text-center font-display">
            <Server className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground/50 mb-3 sm:mb-4" />
            <h3 className="text-base sm:text-lg font-medium">未找到实例</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-md px-4">
              我们找不到符合您当前筛选条件的实例。请尝试调整您的筛选条件。
            </p>
          </div>
        )}
      </div>

      {/* Rental Dialog */}
      <Dialog open={isRentDialogOpen} onOpenChange={setIsRentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>租用 {selectedInstance?.name}</DialogTitle>
            <DialogDescription>
              配置您的租用时长
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="rental-period">租用时长（天）</Label>
              <Input
                id="rental-period"
                type="number"
                min="1"
                value={rentalPeriod}
                onChange={(e) => setRentalPeriod(parseInt(e.target.value))}
              />
            </div>
            
            <div className="pt-2">
              <p className="text-sm font-medium">费用摘要</p>
              <div className="flex justify-between mt-2">
                <span className="text-muted-foreground">
                  {rentalPeriod} {rentalPeriod === 1 ? '天' : '天'} @ ¥{selectedInstance?.dailyPrice || (selectedInstance?.price * 24).toFixed(2)}/天
                </span>
                <span className="font-medium">
                  ¥{selectedInstance ? ((selectedInstance.dailyPrice || selectedInstance.price * 24) * rentalPeriod).toFixed(2) : '0.00'}
                </span>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRentDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleRentNow}>
              确认租用
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Payment Method Dialog */}
      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>请选择支付方式</DialogTitle>
            <DialogDescription>
              选择您偏好的支付方式完成订单
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="rounded-md border p-4">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="font-medium">租用订单</p>
                  <p className="text-sm text-muted-foreground">{selectedInstance?.name} - {rentalPeriod}天</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">¥{selectedInstance ? ((selectedInstance.dailyPrice || selectedInstance.price * 24) * rentalPeriod).toFixed(2) : '0.00'}</p>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <RadioGroup 
                value={selectedPaymentMethod}
                onValueChange={setSelectedPaymentMethod}
                className="space-y-3"
              >
                {paymentMethods.map(method => (
                  <div key={method.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={method.id} id={`list-${method.id}`} />
                    <Label htmlFor={`list-${method.id}`} className="flex items-center cursor-pointer">
                      <span className="flex items-center justify-center w-8 h-8 rounded-md bg-muted mr-2">
                        {method.icon}
                      </span>
                      {method.name}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
          
          <DialogFooter className="sm:justify-between">
            <Button 
              variant="outline" 
              onClick={() => {
                setIsPaymentDialogOpen(false);
                setIsRentDialogOpen(true);
              }}
            >
              返回
            </Button>
            <Button onClick={handlePayment}>
              确认支付
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Instances;
