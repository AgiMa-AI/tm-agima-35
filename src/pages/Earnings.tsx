
import React from 'react';
import Layout from '@/components/layout/Layout';
import EarningsSummaryCards from '@/components/earnings/EarningsSummaryCards';
import EarningsTrends from '@/components/earnings/EarningsTrends';
import EarningsTabContent from '@/components/earnings/EarningsTabContent';
import EarningsSidebar from '@/components/earnings/EarningsSidebar';

const Earnings = () => {
  return (
    <Layout>
      <div className="space-y-4 sm:space-y-6">
        <div className="bg-background p-3 sm:p-4 rounded-md shadow-sm">
          <h1 className="text-xl sm:text-2xl font-medium">收益管理</h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">
            查看并管理您的算力出租收益
          </p>
        </div>
        
        <EarningsSummaryCards />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <EarningsTrends />
            <EarningsTabContent />
          </div>
          
          <div>
            <EarningsSidebar />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Earnings;
