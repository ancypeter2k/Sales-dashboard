import { formatPercent } from "../utils/formatters";

const STATUS_TONE = {
  New: "bg-sky-500/15 text-sky-700 ring-sky-500/30 dark-chip",
  Contacted: "bg-cyan-500/15 text-cyan-700 ring-cyan-500/30 dark-chip",
  "Follow Up": "bg-amber-500/15 text-amber-700 ring-amber-500/30 dark-chip",
  "Appointment Booked": "bg-indigo-500/15 text-indigo-700 ring-indigo-500/30 dark-chip",
  Converted: "bg-emerald-500/15 text-emerald-700 ring-emerald-500/30 dark-chip",
  Lost: "bg-rose-500/15 text-rose-700 ring-rose-500/30 dark-chip",
};

export default function StatusTable({ data }) {
  const totalLeads = data.reduce((sum, row) => sum + row.count, 0);

  return (
    <section className="panel-surface fade-in table-section p-6">
      {/* Table Header */}
      <header className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="heading-main text-lg font-semibold">Lead Status Breakdown</h2>
          <p className="copy text-sm">Detailed volume and share across each stage.</p>
        </div>
      </header>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="eyebrow text-left text-xs">
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Leads</th>
              <th className="px-3 py-2">Share</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => {
              const share = totalLeads ? row.count / totalLeads : 0;
              const tone = STATUS_TONE[row.status] || "bg-slate-100 text-slate-700 ring-slate-600/20";

              return (
                <tr
                  key={row.status}
                  className="table-row-item row-reveal"
                  style={{ animationDelay: `${index * 65}ms` }}
                >
                  <td className="rounded-l-lg px-3 py-3">
                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${tone}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-sm font-semibold">{row.count}</td>
                  <td className="rounded-r-lg px-3 py-3 text-sm">{formatPercent(share)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
