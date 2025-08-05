import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Label } from "recharts";

const THEME_COLORS = {
  income: "#22c55e",    // green-500
  expense: "#3b82f6",   // blue-500
  balance: "#ef4444",   // red-500
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 shadow-lg rounded border">
        <p className="text-sm font-medium">{payload[0].name}</p>
        <p className="text-sm font-bold">₹{payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const CustomPieChart = ({ data, colors, totalAmount, showTextAbove }) => {
  const pieColors = [THEME_COLORS.income, THEME_COLORS.expense, THEME_COLORS.balance];
  
  return (
    <div className="w-full h-[300px] relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={90}
            paddingAngle={4}
            dataKey="value"
            strokeWidth={2}
            stroke="#ffffff"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={pieColors[index]}
                className="drop-shadow-xl"
              />
            ))}
            {/* Center Text */}
            <Label
              position="center"
              style={{
                fontSize: '14px',
                fill: '#6b7280',
                fontFamily: 'sans-serif'
              }}
 
            />
            <Label
              position="centerBottom"
              style={{
                fontSize: '18px',
                fill: '#111827',
                fontWeight: 'bold',
                fontFamily: 'sans-serif'
              }}
              value={`Balance: ${totalAmount.toLocaleString()}`}
            />
            
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="flex justify-center gap-6 mt-6">
        {data.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: pieColors[index] }}
            />
            <span className="text-sm text-gray-600">{entry.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomPieChart;
