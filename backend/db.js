const { Pool } = require("pg");

const connectionString =
  process.env.DATABASE_URL ||
  process.env.PGURI ||
  "postgresql://localhost:5432/sales_dashboard";

const pool = new Pool({
  connectionString,
  max: 10,
  idleTimeoutMillis: 30000,
});

module.exports = { pool, query: (text, params) => pool.query(text, params) };
