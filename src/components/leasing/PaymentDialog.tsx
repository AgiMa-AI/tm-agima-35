
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { CreditCard, Check } from 'lucide-react';

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPayment: () => void;
  selectedResourceType: string;
  totalCost: string;
  resourceCount: string;
  leaseDays: string;
}

const PaymentDialog = ({
  open,
  onOpenChange,
  onPayment,
  selectedResourceType,
  totalCost,
  resourceCount,
  leaseDays
}: PaymentDialogProps) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState('wechat');
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const paymentMethods: PaymentMethod[] = [
    {
      id: 'wechat',
      name: '微信支付',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 7.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" /><path d="M17 11.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" /><path d="M15 8c2.7 0 5.5 2.5 2.5 5.5a4 4 0 0 1-2.15 1.61A3 3 0 0 1 12 17.98V21" /><path d="M8 11c-2.5 0-5-3-3-6.5a4 4 0 0 1 1.9-1.64A3 3 0 0 1 10 1" /></svg>,
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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`sm:max-w-md rounded-2xl p-0 overflow-hidden ${isMobile ? 'w-[calc(100%-32px)] mx-auto' : ''}`}>
        <DialogHeader className="bg-tiffany-lightest/70 p-6 border-b border-tiffany-light/20">
          <DialogTitle className="text-lg text-tiffany-dark">请选择支付方式</DialogTitle>
          <DialogDescription>
            选择您偏好的支付方式完成订单
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 p-6 bg-white">
          <div className="rounded-xl border border-tiffany-lighter/50 p-4 bg-white shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="font-medium text-tiffany-darker">
                  {selectedResourceType === 'gpu' ? 'GPU租赁订单' : 'CPU租赁订单'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {selectedResourceType === 'gpu' 
                    ? `${resourceCount} × A100 80GB - ${leaseDays}天` 
                    : `${resourceCount}核心 - ${leaseDays}天`}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg text-tiffany-dark">¥{totalCost}</p>
              </div>
            </div>
            
            <Separator className="my-3 bg-tiffany-lightest" />
            
            <RadioGroup 
              value={selectedPaymentMethod}
              onValueChange={setSelectedPaymentMethod}
              className="space-y-3"
            >
              {paymentMethods.map(method => (
                <div 
                  key={method.id} 
                  className={`flex items-center p-3 rounded-lg border-2 transition-all ${
                    selectedPaymentMethod === method.id 
                      ? 'border-tiffany bg-tiffany-lightest' 
                      : 'border-transparent hover:border-tiffany-lighter'
                  }`}
                  onClick={() => setSelectedPaymentMethod(method.id)}
                >
                  <RadioGroupItem value={method.id} id={`list-${method.id}`} className="mr-2 text-tiffany border-tiffany" />
                  <Label htmlFor={`list-${method.id}`} className="flex items-center cursor-pointer flex-1">
                    <span className="flex items-center justify-center w-8 h-8 rounded-md bg-tiffany-lightest mr-2 text-tiffany-dark">
                      {method.icon}
                    </span>
                    <span>{method.name}</span>
                  </Label>
                  {selectedPaymentMethod === method.id && (
                    <Check className="h-4 w-4 text-tiffany" />
                  )}
                </div>
              ))}
            </RadioGroup>
          </div>
          
          <DialogFooter className="flex flex-col sm:flex-col gap-2 sm:space-x-0">
            <Button 
              variant="tiffany" 
              onClick={onPayment} 
              className="w-full rounded-full h-12"
            >
              确认支付
            </Button>
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)} 
              className="w-full rounded-full border-tiffany-light text-tiffany-dark h-10"
            >
              取消
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
