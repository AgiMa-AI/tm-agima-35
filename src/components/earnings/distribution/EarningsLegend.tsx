
import React from 'react';
import EarningsLegendItem from './EarningsLegendItem';

interface EarningsData {
  name: string;
  value: number;
}

interface EarningsLegendProps {
  data: EarningsData[];
  colors: string[];
}

const EarningsLegend = ({ data, colors }: EarningsLegendProps) => {
  return (
    <div className="mt-2 sm:mt-4 space-y-1 sm:space-y-2">
      {data.map((entry, index) => (
        <EarningsLegendItem 
          key={index}
          name={entry.name}
          value={entry.value}
          color={colors[index % colors.length]}
        />
      ))}
    </div>
  );
};

export default EarningsLegend;
