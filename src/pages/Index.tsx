
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import MetricCard from '@/components/ui/MetricCard';
import InstanceCard from '@/components/dashboard/InstanceCard';
import FilterBar from '@/components/dashboard/FilterBar';
import { useInstances } from '@/hooks/useInstances';
import { Server, Clock, CreditCard, Database } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const Index = () => {
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
  
  const handleSearch = (query: string) => {
    updateFilters({ search: query || undefined });
  };
  
  const handleFilterChange = (newFilters: any) => {
    updateFilters(newFilters);
  };
  
  return (
    <Layout searchHandler={handleSearch}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">控制面板</h1>
          <p className="text-muted-foreground mt-1">
            监控和管理您的 GPU 实例
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="可用实例"
            value={instances.filter(i => i.availability === 'available').length}
            description="可立即租用的 GPU 实例"
            icon={<Server className="h-4 w-4" />}
          />
          <MetricCard
            title="活跃租用"
            value={instances.filter(i => i.availability === 'rented').length}
            description="当前使用中"
            icon={<Clock className="h-4 w-4" />}
          />
          <MetricCard
            title="平均价格"
            value={`¥${(instances.reduce((sum, i) => sum + i.price, 0) / Math.max(instances.length, 1)).toFixed(2)}`}
            description="每小时"
            icon={<CreditCard className="h-4 w-4" />}
            trend={{ value: 5.2, isPositive: false }}
          />
          <MetricCard
            title="总存储容量"
            value={`${instances.reduce((sum, i) => sum + i.storageSize, 0).toLocaleString()} GB`}
            description="所有实例总计"
            icon={<Database className="h-4 w-4" />}
          />
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">GPU 实例</h2>
            <p className="text-sm text-muted-foreground">
              显示 {filteredCount} 个，共 {totalCount} 个实例
            </p>
          </div>
          
          <FilterBar
            availableFilters={filterOptions}
            activeFilters={filters}
            onFilterChange={handleFilterChange}
            onFilterReset={resetFilters}
          />
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array(8).fill(0).map((_, i) => (
                <div key={i} className="flex flex-col space-y-3">
                  <Skeleton className="h-[300px] w-full rounded-xl" />
                </div>
              ))}
            </div>
          ) : instances.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {instances.map((instance) => (
                <InstanceCard key={instance.id} instance={instance} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Server className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium">未找到实例</h3>
              <p className="text-muted-foreground mt-1 max-w-md">
                我们找不到符合您当前筛选条件的实例。请尝试调整您的筛选条件。
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
