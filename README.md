# Sales Dashboard App

Full-stack Sales Dashboard for internal business monitoring. The app provides KPI summaries, lead status analytics, trend visualization, and basic date-range filtering.

## Project Highlights

- Frontend and backend are clearly separated.
- Backend aggregates raw lead records into dashboard-ready metrics.
- Frontend renders KPI cards, status table, and charts from API responses.
- Supports `Last 7 Days` and `Last 30 Days` filtering.
- Includes loading, error, and empty-state handling.
- Includes light/dark theme and enhanced UI styling.

## Tech Stack

- Frontend: React, Redux Toolkit, Vite, Tailwind CSS, Recharts
- Backend: Node.js, Express
- Database: PostgreSQL 

## Folder Structure

```text
sales-dashboard/
  backend/
    server.js
    db.js
    schema.sql
    run-schema.js
    seed.js
    data.js
  frontend/
    src/
      app/
      components/
      features/dashboard/
```

## API Contract

### `GET /api/dashboard?days=7|30`

Response:

```json
{
  "kpis": {
    "totalLeads": 0,
    "contactedLeads": 0,
    "salesClosed": 0,
    "totalRevenue": 0
  },
  "statusSummary": [
    { "status": "New", "count": 0 },
    { "status": "Contacted", "count": 0 },
    { "status": "Follow Up", "count": 0 },
    { "status": "Appointment Booked", "count": 0 },
    { "status": "Converted", "count": 0 },
    { "status": "Lost", "count": 0 }
  ],
  "salesTrend": [
    { "date": "2026-02-21", "revenue": 0 }
  ]
}
```

`salesTrend` is returned as a complete day-by-day series for the requested range, including days with `0` revenue.

## Local Setup

### 1. Backend Setup

```bash
cd backend
npm install
```

Optional database URL:

```bash
export DATABASE_URL=postgresql://localhost:5432/sales_dashboard
```

Create schema and seed dummy data:

```bash
npm run db:setup
```

Start backend:

```bash
npm start
```

Backend runs on `http://localhost:5001`.

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Optional frontend API override:

```bash
export VITE_API_BASE_URL=http://localhost:5001
```

Start frontend:

```bash
npm run dev
```

Frontend runs on `http://localhost:5173` by default.

## Scripts

### Backend (`backend/`)

- `npm start` - Start API server
- `npm run db:schema` - Apply DB schema
- `npm run db:seed` - Seed dummy data
- `npm run db:setup` - Run schema + seed

### Frontend (`frontend/`)

- `npm run dev` - Start Vite dev server
- `npm run lint` - Run ESLint
- `npm run build` - Build production bundle
- `npm run preview` - Preview production build

## Architecture Notes

- Backend owns aggregation logic for KPI and chart data.
- Frontend owns state management and visual rendering.
- Redux async thunk handles loading and error states consistently.
- Status ordering is deterministic via shared status list.
- Database is primary data source; in-memory data allows quick local fallback.

## Validation

```bash
cd frontend
npm run lint
npm run build
```