const { pool } = require("./db");
const fs = require("fs");
const path = require("path");

async function runSchema() {
  const sql = fs.readFileSync(path.join(__dirname, "schema.sql"), "utf8");
  const statements = sql
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean);
  const client = await pool.connect();
  try {
    for (const stmt of statements) {
      if (stmt.length) await client.query(stmt + ";");
    }
    console.log("Schema applied.");
  } finally {
    client.release();
    await pool.end();
  }
}

runSchema().catch((err) => {
  console.error("Schema failed:", err.message);
  process.exit(1);
});
