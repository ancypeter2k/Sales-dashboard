import pg from "pg";

const { Pool } = pg;

const connectionString =
  process.env.DATABASE_URL ||
  process.env.PGURI ||
  "postgresql://localhost:5432/sales_dashboard";

// SCRAM auth requires password to be a string (never undefined)
const poolConfig = {
  connectionString,
  max: 10,
  idleTimeoutMillis: 30000,
};
try {
  const url = new URL(connectionString);
  poolConfig.password =
    url.password != null ? String(url.password) : "";
} catch {
  poolConfig.password = "";
}

const pool = new Pool(poolConfig);

export const query = (text, params) => pool.query(text, params);
export { pool };
