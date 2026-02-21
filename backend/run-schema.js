import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { readFileSync } from "fs";
import { pool } from "./db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function runSchema() {
  const sql = readFileSync(join(__dirname, "schema.sql"), "utf8");
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
