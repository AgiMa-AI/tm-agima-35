
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useAGIModels } from '@/hooks/useAGIModels';
import { Skeleton } from '@/components/ui/skeleton';
import AGIModelCard from '@/components/agi/AGIModelCard';
import AGIFilterBar from '@/components/agi/AGIFilterBar';
import { Bot, Server, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

// Use the FilterRecord type that matches what useAGIModels expects
type FilterRecord = Record<string, string[] | undefined>;

const AGIModels = () => {
  const { 
    models, 
    filters, 
    updateFilters, 
    resetFilters, 
    loading, 
    filterOptions,
    totalCount,
    filteredCount
  } = useAGIModels();
  
  const navigate = useNavigate();
  
  const handleSearch = (query: string) => {
    // Convert search string to an array to match FilterRecord type
    updateFilters({ search: query ? [query] : undefined });
  };
  
  const handleFilterChange = (newFilters: FilterRecord) => {
    updateFilters(newFilters);
  };

  const handleHostAGI = () => {
    navigate('/agi-hosting');
  };
  
  return (
    <Layout searchHandler={handleSearch}>
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-center sm:text-left">AGI 算力需求</h1>
            <p className="text-muted-foreground mt-1 text-sm sm:text-base text-center sm:text-left">
              浏览和租赁先进的AI算力解决方案
            </p>
          </div>
          <Button onClick={handleHostAGI} className="w-full sm:w-auto">
            <Server className="h-4 w-4 mr-2" />
            提供算力赚取收益
          </Button>
        </div>
        
        <AGIFilterBar
          availableFilters={filterOptions}
          activeFilters={filters}
          onFilterChange={handleFilterChange}
          onFilterReset={resetFilters}
        />
        
        <div className="flex items-end justify-between mb-4 flex-wrap gap-2">
          <p className="text-xs sm:text-sm text-muted-foreground w-full sm:w-auto text-center sm:text-left">
            显示 {filteredCount} 个，共 {totalCount} 个算力方案
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
        ) : models.length > 0 ? (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {models.map((model) => (
              <AGIModelCard key={model.id} model={model} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 sm:py-8 md:py-12 text-center font-display">
            <Cpu className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground/50 mb-3 sm:mb-4" />
            <h3 className="text-base sm:text-lg font-medium">未找到算力方案</h3>
            <p className="text-sm text-muted-foreground mt-1 max-w-md px-4">
              我们找不到符合您当前筛选条件的算力方案。请尝试调整您的筛选条件。
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AGIModels;
