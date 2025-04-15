
import React from 'react';
import { TransferForm } from '@/components/transfer/TransferForm';

const Transfer = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">资金转账</h1>
      <TransferForm />
    </div>
  );
};

export default Transfer;
