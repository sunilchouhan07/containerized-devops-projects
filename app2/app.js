const express = require("express");
const { Client } = require("pg");

const app = express();
const PORT = 3000;

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432
});

client.connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch(err => console.log("DB Error:", err));

app.get("/", async (req, res) => {
  try {
    const result = await client.query("SELECT NOW()");
    res.send(`
      <h1>🚀 Node.js App Running</h1>
      <p>Database Connected</p>
      <p>Time: ${result.rows[0].now}</p>
    `);
  } catch (err) {
    res.send(`<h1>Database Error</h1><p>${err}</p>`);
  }
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});