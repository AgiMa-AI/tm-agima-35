
import React from 'react';
import BillItem from './BillItem';
import { useIsMobile } from '@/hooks/use-mobile';

interface BillListProps {
  periods: string[];
}

const BillList = ({ periods }: BillListProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`space-y-${isMobile ? '2' : '3'} sm:space-y-3 mobile-spacing`}>
      {periods.map((period, index) => (
        <div key={index} className="no-tap-highlight">
          <BillItem period={period} />
        </div>
      ))}
    </div>
  );
};

export default BillList;
