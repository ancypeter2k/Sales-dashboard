import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { formatCurrency, formatDateLabel } from "../utils/formatters";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="tooltip-panel">
      <p className="font-semibold">{formatDateLabel(label)}</p>
      <p className="mt-1">
        Revenue: <span className="font-semibold">{formatCurrency(payload[0].value)}</span>
      </p>
    </div>
  );
}

export default function SalesTrendChart({ data, theme }) {
  const trendData = [...(data || [])].sort((a, b) => new Date(a.date) - new Date(b.date));
  const totalRevenue = trendData.reduce((sum, item) => sum + item.revenue, 0);

  const axisColor = theme === "dark" ? "#94a3b8" : "#475569";
  const gridColor = theme === "dark" ? "#1f3345" : "#dbe7e5";
  const lineColor = theme === "dark" ? "#22d3ee" : "#0f766e";
  const dotColor = theme === "dark" ? "#082f49" : "#ccfbf1";

  if (!trendData.length) {
    return (
      <section className="panel-surface fade-in chart-card chart-card--trend p-6">
        <h2 className="heading-main text-lg font-semibold">Revenue Trend</h2>
        <p className="copy mt-2 text-sm">No revenue events were recorded in the selected window.</p>
      </section>
    );
  }

  return (
    <section className="panel-surface fade-in chart-card chart-card--trend p-6">
      {/* Trend Header */}
      <header className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="heading-main text-lg font-semibold">Revenue Trend</h2>
          <p className="copy text-sm">Daily revenue movement across converted leads.</p>
        </div>
        <p className="copy text-sm font-semibold">Total: {formatCurrency(totalRevenue)}</p>
      </header>

      {/* Trend Chart */}
      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData} margin={{ top: 12, right: 10, left: 4, bottom: 4 }}>
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
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke={lineColor}
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 5, stroke: lineColor, strokeWidth: 2, fill: dotColor }}
              isAnimationActive
              animationDuration={900}
              animationEasing="ease-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
