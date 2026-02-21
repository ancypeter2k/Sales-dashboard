import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboard } from "./features/dashboard/dashboardSlice";
import { BACKEND_DISPLAY_URL } from "./features/dashboard/dashboardAPI";
import KPISection from "./components/KPISection";
import StatusTable from "./components/StatusTable";
import SalesTrendChart from "./components/SalesTrendChart";
import StatusPieChart from "./components/StatusPieChart";
import RevenueAreaChart from "./components/RevenueAreaChart";
import StatusBarChart from "./components/StatusBarChart";
import DateFilter from "./components/DateFilter";

const THEME_KEY = "sales-dashboard-theme";

function App() {
  const dispatch = useDispatch();
  const { data, loading, error, days, fallbackData } = useSelector((state) => state.dashboard);

  const [theme, setTheme] = useState(() => {
    const stored = window.localStorage.getItem(THEME_KEY);
    return stored === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    dispatch(fetchDashboard(days));
  }, [dispatch, days]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const statusHighlights = useMemo(() => {
    if (!data?.statusSummary?.length) {
      return "No stage data available";
    }

    const topStatus = [...data.statusSummary].sort((a, b) => b.count - a.count)[0];
    return `${topStatus.status} is currently the largest lead segment.`;
  }, [data]);

  return (
    <div className="dashboard-shell">
      <main className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Section */}
        <section className="panel-surface fade-in mb-8 flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow mb-2 inline-flex rounded-full px-3 py-1">
              Revenue Intelligence
            </p>
            <h1 className="heading-main text-3xl font-bold tracking-tight sm:text-4xl">
              Sales Performance Dashboard
            </h1>
            <p className="copy mt-3 max-w-2xl text-sm sm:text-base">
              Standardized performance view for lead flow, conversion outcomes, and daily revenue
              momentum.
            </p>
          </div>

          <div className="flex items-end gap-3">
            <DateFilter />
            <button
              type="button"
              onClick={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
              className="theme-button"
              aria-label="Toggle theme"
            >
              {theme === "light" ? "Dark" : "Light"}
            </button>
          </div>
        </section>

        {/* Loading Section */}
        {loading && (
          <div className="panel-surface fade-in p-6">
            <p className="eyebrow text-xs">Updating Dashboard</p>
            <p className="copy mt-2 text-base">Refreshing lead and revenue activity for this period.</p>
          </div>
        )}

        {/* Error Section — only when we have no data at all */}
        {error && !data && (
          <div className="fade-in rounded-2xl border border-rose-300/50 bg-rose-100/80 p-5 text-rose-900 shadow-sm">
            <p className="font-semibold">Unable to load dashboard data.</p>
            <p className="mt-1 text-sm">
              {error}. Start the backend with{" "}
              <code className="rounded bg-rose-200/90 px-1.5 py-0.5 font-semibold">
                cd backend && npm start
              </code>{" "}
              (reachable at {BACKEND_DISPLAY_URL}).
            </p>
          </div>
        )}

        {/* Sample-data notice when showing fallback */}
        {fallbackData && data && (
          <div className="fade-in rounded-2xl border border-amber-300/50 bg-amber-100/80 px-4 py-3 text-amber-900 shadow-sm dark:border-amber-600/40 dark:bg-amber-900/30 dark:text-amber-200">
            <p className="text-sm font-medium">
              Showing sample data. Backend is not running — start it at{" "}
              <code className="rounded bg-amber-200/90 px-1.5 py-0.5 dark:bg-amber-800/50">
                {BACKEND_DISPLAY_URL}
              </code>{" "}
              (<code>cd backend && npm start</code>) for live data.
            </p>
          </div>
        )}

        {/* Dashboard Content Section */}
        {!loading && data && (
          <div className="space-y-6">
            {/* KPI Section */}
            <KPISection kpis={data.kpis} />

            {/* Revenue Charts Section */}
            <section className="section-grid section-grid--revenue grid grid-cols-1 gap-6 xl:grid-cols-2">
              <SalesTrendChart data={data.salesTrend} theme={theme} />
              <RevenueAreaChart data={data.salesTrend} theme={theme} />
            </section>

            {/* Status Charts Section */}
            <section className="section-grid section-grid--status grid grid-cols-1 gap-6 xl:grid-cols-2">
              <StatusPieChart data={data.statusSummary} theme={theme} />
              <StatusBarChart data={data.statusSummary} theme={theme} />
            </section>

            {/* Insights Section */}
            <section className="panel-surface fade-in insight-banner p-4 sm:p-5">
              <p className="copy text-sm font-medium">{statusHighlights}</p>
            </section>

            {/* Status Table Section */}
            <StatusTable data={data.statusSummary} />
          </div>
        )}

        {/* Empty State Section */}
        {!loading && !error && !data && (
          <div className="panel-surface fade-in p-6">
            <p className="heading-main text-lg font-semibold">No dashboard data yet</p>
            <p className="copy mt-2 text-sm">
              Choose a date range to start analyzing lead flow and sales outcomes.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
