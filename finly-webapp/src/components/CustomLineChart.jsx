import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
} from 'recharts';

const CustomLineChart = ({ data }) => {
  const indigo = '#818cf8'; // Indigo-400
  const indigoLight = '#e0e7ff'; // Indigo-100
  const tooltipBackground = 'rgba(255, 255, 255, 0.95)';

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 20,
        }}
      >
        <defs>
          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={indigo} stopOpacity={0.1}/>
            <stop offset="95%" stopColor={indigoLight} stopOpacity={0.1}/>
          </linearGradient>
        </defs>
        <CartesianGrid 
          strokeDasharray="3 3" 
          vertical={false}
          stroke="#e5e7eb"
        />
        <XAxis
          dataKey="date"
          axisLine={false}
          tickLine={false}
          tickFormatter={(date) => {
            // Check if data has period property (for weekly/monthly views)
            const dataPoint = data.find(d => d.date === date);
            if (dataPoint && dataPoint.period) {
              return dataPoint.period;
            }
            
            // Handle different date formats
            if (date.includes('-') && date.length === 7) {
              // Monthly format: "YYYY-MM"
              const [year, month] = date.split('-');
              const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                               'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
              return monthNames[parseInt(month) - 1];
            }
            
            // Daily format
            const d = new Date(date);
            return `${d.getDate()} ${d.toLocaleString('default', { month: 'short' })}`;
          }}
          stroke="#6b7280"
          fontSize={12}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) => formatCurrency(value)}
          stroke="#6b7280"
          fontSize={12}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: tooltipBackground,
            border: 'none',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            padding: '12px',
          }}
          formatter={(value) => [formatCurrency(value), 'Balance']}
          labelFormatter={(date) => {
            // Check if data has period property (for weekly/monthly views)
            const dataPoint = data.find(d => d.date === date);
            if (dataPoint && dataPoint.period) {
              return dataPoint.period;
            }
            
            // Handle different date formats
            if (date.includes('-') && date.length === 7) {
              // Monthly format: "YYYY-MM"
              const [year, month] = date.split('-');
              const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                               'July', 'August', 'September', 'October', 'November', 'December'];
              return `${monthNames[parseInt(month) - 1]} ${year}`;
            }
            
            // Daily format
            const d = new Date(date);
            return `${d.toLocaleString('default', { month: 'long' })} ${d.getDate()}, ${d.getFullYear()}`;
          }}
        />
        <Area
          type="monotone"
          dataKey="amount"
          stroke="none"
          fill="url(#colorGradient)"
        />
        <Line
          type="monotone"
          dataKey="amount"
          stroke={indigo}
          strokeWidth={3}
          dot={{
            r: 4,
            fill: 'white',
            stroke: indigo,
            strokeWidth: 2,
          }}
          activeDot={{
            r: 6,
            fill: 'white',
            stroke: indigo,
            strokeWidth: 3,
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CustomLineChart;
