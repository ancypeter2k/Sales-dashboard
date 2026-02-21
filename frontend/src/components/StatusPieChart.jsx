import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { formatPercent } from "../utils/formatters";

const COLORS = ["#06b6d4", "#14b8a6", "#eab308", "#f97316", "#f43f5e", "#8b5cf6"];

export default function StatusPieChart({ data, theme }) {
  const statusData = data || [];
  const legendColor = theme === "dark" ? "#cbd5e1" : "#475569";

  if (!statusData.length) {
    return (
      <section className="panel-surface fade-in chart-card chart-card--mix p-6">
        <h2 className="heading-main text-lg font-semibold">Lead Stage Mix</h2>
        <p className="copy mt-2 text-sm">No lead status activity is available.</p>
      </section>
    );
  }

  const total = statusData.reduce((sum, item) => sum + item.count, 0);

  return (
    <section className="panel-surface fade-in chart-card chart-card--mix p-6">
      {/* Status Mix Header */}
      <header className="mb-6">
        <h2 className="heading-main text-lg font-semibold">Lead Stage Mix</h2>
        <p className="copy text-sm">Distribution of leads by current lifecycle status.</p>
      </header>

      {/* Status Mix Chart */}
      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={statusData}
              dataKey="count"
              nameKey="status"
              cx="50%"
              cy="50%"
              outerRadius={106}
              innerRadius={64}
              paddingAngle={2}
              label={({ value }) => {
                const share = total ? value / total : 0;
                return share >= 0.08 ? formatPercent(share) : "";
              }}
              labelLine={false}
              isAnimationActive
              animationDuration={950}
            >
              {statusData.map((entry, index) => (
                <Cell key={entry.status} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip
              formatter={(value) => {
                const share = total ? value / total : 0;
                return [`${value} leads (${formatPercent(share)})`, "Count"];
              }}
            />
            <Legend iconType="circle" wrapperStyle={{ fontSize: "12px", color: legendColor }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
