
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ListFilter, ArrowUpDown } from 'lucide-react';

interface EarningsTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const EarningsTabs = ({ activeTab, onTabChange }: EarningsTabsProps) => {
  return (
    <div className="flex items-center justify-between">
      <TabsList className="mb-2">
        <TabsTrigger 
          value="tasks" 
          onClick={() => onTabChange('tasks')}
          className={activeTab === 'tasks' ? 'bg-primary text-primary-foreground' : ''}
        >
          <ListFilter className="h-4 w-4 mr-2" />
          算力任务记录
        </TabsTrigger>
        <TabsTrigger 
          value="transfer" 
          onClick={() => onTabChange('transfer')}
          className={activeTab === 'transfer' ? 'bg-primary text-primary-foreground' : ''}
        >
          <ArrowUpDown className="h-4 w-4 mr-2" />
          资金转账
        </TabsTrigger>
      </TabsList>
    </div>
  );
};

export default EarningsTabs;
