import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatCurrency, formatDateLabel } from "../utils/formatters";

function buildRunningTotal(data) {
  let cumulative = 0;

  return data.map((item) => {
    cumulative += item.revenue;
    return {
      ...item,
      cumulative,
    };
  });
}

export default function RevenueAreaChart({ data, theme }) {
  const trendData = [...(data || [])].sort((a, b) => new Date(a.date) - new Date(b.date));
  const cumulativeData = buildRunningTotal(trendData);

  const axisColor = theme === "dark" ? "#94a3b8" : "#475569";
  const gridColor = theme === "dark" ? "#1f3345" : "#dbe7e5";
  const strokeColor = theme === "dark" ? "#c084fc" : "#7c3aed";
  const gradientStart = theme === "dark" ? "#7e22ce" : "#a855f7";
  const gradientStop = theme === "dark" ? "#581c87" : "#f3e8ff";

  if (!cumulativeData.length) {
    return (
      <section className="panel-surface fade-in chart-card chart-card--cumulative p-6">
        <h2 className="heading-main text-lg font-semibold">Cumulative Revenue</h2>
        <p className="copy mt-2 text-sm">No cumulative trend available for the selected period.</p>
      </section>
    );
  }

  return (
    <section className="panel-surface fade-in chart-card chart-card--cumulative p-6">
      {/* Cumulative Header */}
      <header className="mb-6">
        <h2 className="heading-main text-lg font-semibold">Cumulative Revenue</h2>
        <p className="copy text-sm">Running total view to track pace over time.</p>
      </header>

      {/* Cumulative Chart */}
      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={cumulativeData} margin={{ top: 12, right: 10, left: 4, bottom: 4 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={gradientStart} stopOpacity={0.45} />
                <stop offset="95%" stopColor={gradientStop} stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={gridColor} strokeDasharray="4 6" vertical={false} />
            <XAxis
              dataKey="date"
              tickFormatter={formatDateLabel}
              tick={{ fontSize: 12, fill: axisColor }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(value) => `$${Math.round(value / 1000)}k`}
              tick={{ fontSize: 12, fill: axisColor }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip formatter={(value) => [formatCurrency(value), "Cumulative"]} labelFormatter={formatDateLabel} />
            <Area
              type="monotone"
              dataKey="cumulative"
              stroke={strokeColor}
              strokeWidth={2.5}
              fill="url(#revenueGradient)"
              isAnimationActive
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
