
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useAGIModels } from '@/hooks/useAGIModels';
import { Skeleton } from '@/components/ui/skeleton';
import AGIModelCard from '@/components/agi/AGIModelCard';
import AGIFilterBar from '@/components/agi/AGIFilterBar';
import { Bot, Server, Cpu, Zap, FlaskConical, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

// Use the FilterRecord type from useAGIModels to ensure compatibility
import { FilterRecord } from '@/hooks/useAGIModels';

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
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 p-6 mb-4">
          <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(0deg,transparent,#fff)]"></div>
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="h-6 w-6 text-purple-300" />
                  <h1 className="font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white">先进通用智能算力</h1>
                </div>
                <p className="text-purple-200/90 mt-1 text-sm sm:text-base text-center sm:text-left max-w-xl">
                  探索顶尖AGI计算平台，从量子加速计算到神经形态计算，为您的AI项目提供突破性能力
                </p>
              </div>
              <Button 
                onClick={handleHostAGI} 
                className="w-full sm:w-auto bg-white text-indigo-900 hover:bg-purple-100"
              >
                <Server className="h-4 w-4 mr-2" />
                提供算力赚取收益
              </Button>
            </div>
          </div>
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
                <Skeleton className="h-[300px] sm:h-[380px] w-full rounded-xl" />
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
          <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-center">
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <div className="w-24 h-24 rounded-full bg-indigo-500/30 animate-pulse"></div>
              </div>
              <FlaskConical className="h-12 w-12 text-indigo-500/70 relative z-10" />
            </div>
            <h3 className="text-lg sm:text-xl font-medium">未找到算力方案</h3>
            <p className="text-sm text-muted-foreground mt-2 max-w-md px-4">
              我们找不到符合您当前筛选条件的算力方案。请尝试调整您的筛选条件或重置筛选器。
            </p>
            <Button 
              variant="outline" 
              onClick={resetFilters}
              className="mt-4"
            >
              <Zap className="mr-2 h-4 w-4" />
              重置筛选条件
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AGIModels;
