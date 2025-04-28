
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Wallet } from 'lucide-react';

const TransferForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Wallet className="h-5 w-5 mr-2 text-primary" />
          资金转账
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="transfer-amount">转账金额</Label>
          <div className="relative">
            <Input 
              id="transfer-amount" 
              type="number" 
              placeholder="请输入转账金额" 
              min="1"
              className="pr-12"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              CNY
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="transfer-destination">转账目标</Label>
          <Select>
            <SelectTrigger id="transfer-destination">
              <SelectValue placeholder="选择转账目标" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bank">银行账户</SelectItem>
              <SelectItem value="alipay">支付宝</SelectItem>
              <SelectItem value="wechat">微信钱包</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="transfer-account">收款账号</Label>
          <Input 
            id="transfer-account" 
            placeholder="请输入收款账号" 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="transfer-name">收款人姓名</Label>
          <Input 
            id="transfer-name" 
            placeholder="请输入收款人姓名" 
          />
        </div>
        
        <Button className="w-full mt-2">提交转账申请</Button>
        
        <p className="text-xs text-muted-foreground text-center">
          注：转账申请提交后，系统将在1-3个工作日内处理
        </p>
      </CardContent>
    </Card>
  );
};

export default TransferForm;
