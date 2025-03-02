
import React from 'react';
import Layout from '@/components/layout/Layout';
import InstanceCard from '@/components/dashboard/InstanceCard';
import FilterBar from '@/components/dashboard/FilterBar';
import { useInstances } from '@/hooks/useInstances';
import { Server } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

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
  
  const handleSearch = (query: string) => {
    updateFilters({ search: query || undefined });
  };
  
  const handleFilterChange = (newFilters: any) => {
    updateFilters(newFilters);
  };
  
  return (
    <Layout searchHandler={handleSearch}>
      <div className="space-y-4 sm:space-y-6">
        <div className="text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">所有 GPU 实例</h1>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">
            浏览和筛选可用的 GPU 实例
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
              <InstanceCard key={instance.id} instance={instance} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 sm:py-8 md:py-12 text-center">
            <Server className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground/50 mb-3 sm:mb-4" />
            <h3 className="text-base sm:text-lg font-medium">未找到实例</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-md px-4">
              我们找不到符合您当前筛选条件的实例。请尝试调整您的筛选条件。
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Instances;
