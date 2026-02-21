import "dotenv/config";
import express from "express";
import cors from "cors";
import { query } from "./db.js";
import { leads as inMemoryLeads, STATUSES } from "./data.js";

const app = express();
app.use(cors());
app.use(express.json());

// Helpers: date normalization and range boundaries
const toDateKey = (dateLike) =>
  new Date(dateLike).toISOString().split("T")[0];

const getCutoffDate = (days) => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - (days - 1));
  return d;
};

// Aggregation: day-by-day revenue series for selected window
const buildDailySeries = (leads, days) => {
  const revenueByDate = {};

  leads.forEach((lead) => {
    const createdAt = lead.createdAt ?? lead.created_at;
    const key = toDateKey(createdAt);
    if (!revenueByDate[key]) revenueByDate[key] = 0;
    revenueByDate[key] += Number(lead.revenue ?? 0);
  });

  const series = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let offset = days - 1; offset >= 0; offset -= 1) {
    const d = new Date(today);
    d.setDate(today.getDate() - offset);
    const key = toDateKey(d);
    series.push({
      date: key,
      revenue: revenueByDate[key] ?? 0,
    });
  }

  return series;
};

// Aggregation: KPI summary + status counts + trend series
const buildDashboardResponse = (leads, days) => {
  const totalLeads = leads.length;
  const contactedLeads = leads.filter((l) => l.status === "Contacted").length;
  const salesClosed = leads.filter((l) => l.status === "Converted").length;
  const totalRevenue = leads.reduce((sum, l) => sum + Number(l.revenue ?? 0), 0);

  const statusSummary = STATUSES.map((status) => ({
    status,
    count: leads.filter((l) => l.status === status).length,
  }));

  const salesTrend = buildDailySeries(leads, days);

  return {
    kpis: { totalLeads, contactedLeads, salesClosed, totalRevenue },
    statusSummary,
    salesTrend,
  };
};

// Data filter: retain leads inside selected rolling window
const filterLeadsByDays = (leads, days) => {
  const cutoff = getCutoffDate(days);
  return leads.filter((l) => new Date(l.createdAt ?? l.created_at) >= cutoff);
};

// API route: dashboard summary endpoint (always returns 200 with data; falls back to in-memory on any error)
app.get("/api/dashboard", async (req, res) => {
  const days = Math.min(Math.max(parseInt(req.query.days, 10) || 7, 1), 365);

  try {
    const cutoff = getCutoffDate(days);
    const cutoffIso = cutoff.toISOString();

    const { rows: leads } = await query(
      `SELECT status, revenue, created_at AS "createdAt"
       FROM leads
       WHERE created_at >= $1
       ORDER BY created_at`,
      [cutoffIso]
    );

    return res.json(buildDashboardResponse(leads, days));
  } catch (err) {
    console.warn("Dashboard: using in-memory fallback.", err.message);
  }

  try {
    const filtered = filterLeadsByDays(inMemoryLeads, days);
    return res.json(buildDashboardResponse(filtered, days));
  } catch (fallbackErr) {
    console.error("Dashboard fallback failed:", fallbackErr);
    return res.status(500).json({
      kpis: { totalLeads: 0, contactedLeads: 0, salesClosed: 0, totalRevenue: 0 },
      statusSummary: STATUSES.map((s) => ({ status: s, count: 0 })),
      salesTrend: [],
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Dashboard API: http://localhost:${PORT}/api/dashboard`)
);
