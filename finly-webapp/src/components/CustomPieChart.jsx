import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const THEME_COLORS = {
  income: "#22c55e", // green-500
  expense: "#3b82f6", // blue-500
  balance: "#ef4444", // red-500
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 shadow-lg rounded border">
        <p className="text-sm font-medium">{payload[0].name}</p>
        <p className="text-sm font-bold">
          ₹{payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

const CustomPieChart = ({ data, colors, totalAmount, showTextAbove }) => {
  const pieColors = [
    THEME_COLORS.income,
    THEME_COLORS.expense,
    THEME_COLORS.balance,
  ];

  return (
    <div className="w-full h-[220px] relative ">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
            strokeWidth={4}
            stroke="#ffffffff"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={pieColors[index]}
                className="drop-shadow-xl"
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Center Text Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-sm text-gray-500 font-medium">Balance</span>
        <span className="text-xl font-bold text-gray-900">
          Rs:{totalAmount.toLocaleString()}
        </span>
      </div>

      <div className="flex justify-center gap-6 mt-4 bg-emerald-100/40 p-2 rounded shadow">
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
