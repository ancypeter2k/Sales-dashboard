import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function StatusBarChart({ data, theme }) {
  const statusData = data || [];

  const axisColor = theme === "dark" ? "#94a3b8" : "#475569";
  const gridColor = theme === "dark" ? "#1f3345" : "#dbe7e5";
  const barColor = theme === "dark" ? "#2dd4bf" : "#0f766e";

  if (!statusData.length) {
    return (
      <section className="panel-surface fade-in chart-card chart-card--compare p-6">
        <h2 className="heading-main text-lg font-semibold">Stage Volume Comparison</h2>
        <p className="copy mt-2 text-sm">No status counts available for comparison.</p>
      </section>
    );
  }

  return (
    <section className="panel-surface fade-in chart-card chart-card--compare p-6">
      {/* Status Comparison Header */}
      <header className="mb-6">
        <h2 className="heading-main text-lg font-semibold">Stage Volume Comparison</h2>
        <p className="copy text-sm">Quick bar comparison across lead stages.</p>
      </header>

      {/* Status Comparison Chart */}
      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={statusData} margin={{ top: 12, right: 8, left: 0, bottom: 16 }}>
            <CartesianGrid stroke={gridColor} strokeDasharray="4 6" vertical={false} />
            <XAxis
              dataKey="status"
              tick={{ fontSize: 11, fill: axisColor }}
              axisLine={false}
              tickLine={false}
              interval={0}
              angle={-12}
              textAnchor="end"
              height={58}
            />
            <YAxis
              tick={{ fontSize: 12, fill: axisColor }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />
            <Tooltip formatter={(value) => [`${value} leads`, "Count"]} />
            <Bar
              dataKey="count"
              fill={barColor}
              radius={[8, 8, 0, 0]}
              isAnimationActive
              animationDuration={920}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
