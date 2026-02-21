import { formatCurrency, formatInteger, formatPercent } from "../utils/formatters";

export default function KPISection({ kpis }) {
  const totalLeads = Number(kpis?.totalLeads) || 0;
  const contactedLeads = Number(kpis?.contactedLeads) || 0;
  const salesClosed = Number(kpis?.salesClosed) || 0;
  const totalRevenue = Number(kpis?.totalRevenue) || 0;

  const contactedRate = totalLeads ? contactedLeads / totalLeads : 0;
  const closeRate = totalLeads ? salesClosed / totalLeads : 0;

  const cards = [
    {
      label: "Pipeline Volume",
      value: formatInteger(totalLeads),
      note: "Total leads added in the selected period",
      tone: "kpi-tone-cyan",
    },
    {
      label: "Engagement Reach",
      value: formatInteger(contactedLeads),
      note: `${formatPercent(contactedRate)} of leads were contacted`,
      tone: "kpi-tone-teal",
    },
    {
      label: "Closed Deals",
      value: formatInteger(salesClosed),
      note: `${formatPercent(closeRate)} close rate across all leads`,
      tone: "kpi-tone-amber",
    },
    {
      label: "Revenue Captured",
      value: formatCurrency(totalRevenue),
      note: "Attributed to converted leads only",
      tone: "kpi-tone-violet",
    },
  ];

  return (
    <>
      {/* KPI Cards Grid */}
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, index) => (
        <article
          key={card.label}
          className={`panel-surface fade-in kpi-card ${card.tone} p-5`}
          style={{ animationDelay: `${index * 70}ms` }}
        >
          <p className="eyebrow text-xs">{card.label}</p>
          <p className="metric mt-3 text-3xl font-semibold tracking-tight">{card.value}</p>
          <p className="copy mt-2 text-sm">{card.note}</p>
        </article>
      ))}
    </section>
    </>
  );
}
