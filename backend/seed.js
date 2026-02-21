const { pool } = require("./db");

const STATUSES = [
  "New",
  "Contacted",
  "Follow Up",
  "Appointment Booked",
  "Converted",
  "Lost",
];

async function seed() {
  const client = await pool.connect();
  try {
    await client.query("DELETE FROM leads");

    const today = new Date();
    const values = [];
    const params = [];
    let paramIndex = 1;

    for (let i = 0; i < 150; i++) {
      const randomDaysAgo = Math.floor(Math.random() * 30);
      const createdAt = new Date(today);
      createdAt.setDate(today.getDate() - randomDaysAgo);
      const status = STATUSES[Math.floor(Math.random() * STATUSES.length)];
      const revenue =
        status === "Converted" ? Math.floor(Math.random() * 5000) + 500 : 0;

      values.push(`($${paramIndex}, $${paramIndex + 1}, $${paramIndex + 2})`);
      params.push(status, revenue, createdAt.toISOString());
      paramIndex += 3;
    }

    const insertQuery = `
      INSERT INTO leads (status, revenue, created_at)
      VALUES ${values.join(", ")}
    `;
    await client.query(insertQuery, params);

    const { rows } = await client.query("SELECT COUNT(*) AS count FROM leads");
    console.log(`Seeded ${rows[0].count} leads.`);
  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch((err) => {
  console.error("Seed failed:", err.message);
  process.exit(1);
});
