# Sales Dashboard API (Backend)

Express API that serves dashboard data from **PostgreSQL**. The frontend reads from `GET /api/dashboard?days=7|30`.

## Setup

### 1. Create the database

Using PostgreSQL (local or cloud), create a database:

```bash
createdb sales_dashboard
```

Or with `psql`:

```sql
CREATE DATABASE sales_dashboard;
```

### 2. Configure connection

Default (local, no password):

- Host: `localhost`, Port: `5432`, Database: `sales_dashboard`

To override, set one of:

- **`DATABASE_URL`** (or **`PGURI`**): full URL, e.g.  
  `postgresql://user:password@localhost:5432/sales_dashboard`
- Or: `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE`

### 3. Install dependencies and load dummy data

```bash
npm install
export DATABASE_URL=postgresql://localhost:5432/sales_dashboard   # if needed
npm run db:schema   # create tables
npm run db:seed     # insert 150 dummy leads
# Or both: npm run db:setup
```

### 4. Start the API

```bash
npm start
```

API base: **http://localhost:5001/api/dashboard**

## Scripts

| Script       | Description                    |
|-------------|--------------------------------|
| `npm start` | Start the API server           |
| `npm run db:schema` | Create `leads` table and indexes |
| `npm run db:seed`  | Insert dummy leads (150 rows)   |
| `npm run db:setup` | Run schema + seed               |

## Data shape

- **leads**: `id`, `status`, `revenue`, `created_at`
- **status** values: New, Contacted, Follow Up, Appointment Booked, Converted, Lost
- Dummy data: 150 leads over the last 30 days; only “Converted” leads have non-zero revenue.
