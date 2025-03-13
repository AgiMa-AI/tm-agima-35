
import React from 'react';
import DeviceEarningsDistribution from './distribution/DeviceEarningsDistribution';
import WithdrawalRecords from './withdrawal/WithdrawalRecords';
import BillDownload from './bills/BillDownload';

const EarningsSidebar = () => {
  return (
    <div className="space-y-3 sm:space-y-4 md:space-y-6">
      <DeviceEarningsDistribution />
      <WithdrawalRecords />
      <BillDownload />
    </div>
  );
};

export default EarningsSidebar;
