
import React, { useState } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import TaskRecordsTable from './TaskRecordsTable';
import TransferForm from '@/components/transfer/TransferForm';
import EarningsTabs from './tabs/EarningsTabs';

const EarningsTabContent = () => {
  const [activeTab, setActiveTab] = useState('tasks');
  
  return (
    <Tabs defaultValue="tasks" value={activeTab}>
      <EarningsTabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      <TabsContent value="tasks" className="pt-2 sm:pt-4">
        <TaskRecordsTable />
      </TabsContent>
      
      <TabsContent value="transfer" className="pt-2 sm:pt-4">
        <TransferForm />
      </TabsContent>
    </Tabs>
  );
};

export default EarningsTabContent;
