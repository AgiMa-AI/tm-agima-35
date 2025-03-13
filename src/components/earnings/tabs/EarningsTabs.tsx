
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface EarningsTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const EarningsTabs = ({ activeTab, onTabChange }: EarningsTabsProps) => {
  return (
    <TabsList className="w-full grid grid-cols-2">
      <TabsTrigger 
        value="tasks" 
        onClick={() => onTabChange('tasks')}
        className={activeTab === 'tasks' ? 'data-[state=active]:bg-background' : ''}
      >
        算力任务
      </TabsTrigger>
      <TabsTrigger 
        value="transfer" 
        onClick={() => onTabChange('transfer')}
        className={activeTab === 'transfer' ? 'data-[state=active]:bg-background' : ''}
      >
        转账
      </TabsTrigger>
    </TabsList>
  );
};

export default EarningsTabs;
