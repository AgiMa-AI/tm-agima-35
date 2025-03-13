
import React from 'react';
import BillItem from './BillItem';

interface BillListProps {
  periods: string[];
}

const BillList = ({ periods }: BillListProps) => {
  return (
    <div className="space-y-2 sm:space-y-3">
      {periods.map((period, index) => (
        <BillItem key={index} period={period} />
      ))}
    </div>
  );
};

export default BillList;
