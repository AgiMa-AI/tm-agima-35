
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TransactionHistory from './TransactionHistory';
import InvoiceHistory from './InvoiceHistory';
import UsageAnalysis from './UsageAnalysis';

const BillingTabs = () => {
  return (
    <Tabs defaultValue="transactions">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="transactions">交易历史</TabsTrigger>
        <TabsTrigger value="invoices">发票</TabsTrigger>
        <TabsTrigger value="usage">使用分析</TabsTrigger>
      </TabsList>
      
      <TabsContent value="transactions" className="mt-6">
        <TransactionHistory />
      </TabsContent>
      
      <TabsContent value="invoices" className="mt-6">
        <InvoiceHistory />
      </TabsContent>
      
      <TabsContent value="usage" className="mt-6">
        <UsageAnalysis />
      </TabsContent>
    </Tabs>
  );
};

export default BillingTabs;
