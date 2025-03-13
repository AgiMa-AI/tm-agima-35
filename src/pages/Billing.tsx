
import React from 'react';
import Layout from '@/components/layout/Layout';
import AccountBalance from '@/components/billing/AccountBalance';
import MonthlySpending from '@/components/billing/MonthlySpending';
import BillingStatus from '@/components/billing/BillingStatus';
import BillingTabs from '@/components/billing/BillingTabs';
import SidebarTools from '@/components/billing/SidebarTools';

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
          <AccountBalance currentBalance={currentBalance} />
          <MonthlySpending monthlySpending={monthlySpending} />
          <BillingStatus />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <BillingTabs />
          </div>
          
          <div>
            <SidebarTools />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Billing;
