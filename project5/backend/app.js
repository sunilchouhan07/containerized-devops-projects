const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const Redis = require("ioredis");

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432
});

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: 6379
});

// GET with cache
app.get("/employees", async (req, res) => {
  const cached = await redis.get("employees");
  if (cached) {
    console.log("Cache hit");
    return res.json(JSON.parse(cached));
  }

  console.log("Cache miss");
  const result = await pool.query("SELECT * FROM employees");
  await redis.set("employees", JSON.stringify(result.rows), "EX", 30);

  res.json(result.rows);
});

// POST → DB + invalidate cache
app.post("/employees", async (req, res) => {
  const { name } = req.body;
  await pool.query("INSERT INTO employees(name) VALUES($1)", [name]);

  await redis.del("employees"); // invalidate cache

  res.json({ message: "Added & cache cleared" });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(5000, "0.0.0.0", () => {
  console.log("Backend running on 5000");
});