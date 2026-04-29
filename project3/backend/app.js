const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

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

app.get("/employees", async (req, res) => {
  const result = await pool.query("SELECT * FROM employees");
  res.json(result.rows);
});

app.post("/employees", async (req, res) => {
  const { name } = req.body;
  await pool.query("INSERT INTO employees(name) VALUES($1)", [name]);
  res.json({ message: "Added" });
});

app.listen(5000, "0.0.0.0", () => {
  console.log("Backend running on 5000");
});