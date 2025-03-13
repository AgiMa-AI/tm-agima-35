
import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

interface EarningsData {
  name: string;
  value: number;
}

interface EarningsPieChartProps {
  data: EarningsData[];
  colors: string[];
}

const EarningsPieChart = ({ data, colors }: EarningsPieChartProps) => {
  return (
    <div className="h-[160px] sm:h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={45}
            outerRadius={70}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value}%`, '占比']} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EarningsPieChart;
