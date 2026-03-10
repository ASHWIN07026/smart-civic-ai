import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from "recharts";

const PIE_COLORS = ["#3b82f6", "#f97316", "#eab308", "#22c55e", "#a855f7"];

export function TrendChart({ data = [] }) {
  return (
    <div className="card">
      <h3 className="font-semibold text-gray-700 mb-4">📈 Complaints Over Time (30 days)</h3>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11 }}
            tickFormatter={(v) => v.slice(5)} // show MM-DD
          />
          <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
          <Tooltip
            labelFormatter={(l) => `Date: ${l}`}
            formatter={(v) => [`${v} complaints`, "Count"]}
          />
          <Line
            type="monotone" dataKey="count" stroke="#3b82f6"
            strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function CategoryChart({ data = {} }) {
  const chartData = Object.entries(data).map(([name, value]) => ({ name, value }));

  return (
    <div className="card">
      <h3 className="font-semibold text-gray-700 mb-4">🥧 By Category</h3>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={chartData} dataKey="value" nameKey="name"
            cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {chartData.map((_, i) => (
              <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
