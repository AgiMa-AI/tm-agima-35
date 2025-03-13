
import React from 'react';

interface EarningsLegendItemProps {
  name: string;
  value: number;
  color: string;
}

const EarningsLegendItem = ({ name, value, color }: EarningsLegendItemProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <div 
          className="w-2 h-2 sm:w-3 sm:h-3 rounded-full mr-2" 
          style={{ backgroundColor: color }}
        ></div>
        <span className="text-xs sm:text-sm">{name}</span>
      </div>
      <span className="text-xs sm:text-sm font-medium">{value}%</span>
    </div>
  );
};

export default EarningsLegendItem;
