
import React from 'react';
import Layout from '@/components/layout/Layout';
import { useAdminAGIModels } from '@/hooks/useAdminAGIModels';
import AGIModelToolbar from '@/components/admin/agi/AGIModelToolbar';
import AGIModelFilters from '@/components/admin/agi/AGIModelFilters';
import AGIModelList from '@/components/admin/agi/AGIModelList';

const AdminAGIModels = () => {
  const {
    searchTerm,
    setSearchTerm,
    models,
    selectedFilters,
    handleFilterChange,
    isFilterOpen,
    toggleFilter,
    availableFilters,
  } = useAdminAGIModels();

  return (
    <Layout>
      <div className="container py-6">
        <div className="bg-gradient-to-r from-indigo-700 to-purple-700 rounded-xl p-6 text-white mb-6">
          <h1 className="text-2xl font-bold flex items-center">
            AGI 模型管理
          </h1>
          <p className="mt-2 text-indigo-100">
            管理和监控平台支持的所有AGI模型
          </p>
        </div>

        <AGIModelToolbar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onFilterToggle={toggleFilter}
        />

        {isFilterOpen && (
          <AGIModelFilters
            availableFilters={availableFilters}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
          />
        )}

        <AGIModelList models={models} />
      </div>
    </Layout>
  );
};

export default AdminAGIModels;
