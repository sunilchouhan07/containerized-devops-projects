const express = require("express");
const { Client } = require("pg");
const app = express();
// const cors = require("cors");

// app.use(cors());

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 5432
});

client.connect()
.then(() => console.log("DB Connected"))
.catch(err => console.log(err));

app.get("/api/data", async (req, res) => {
  try {
    const result = await client.query("SELECT NOW()");
    res.json({
      message: "Backend + DB working: " + result.rows[0].now
    });
  } catch (err) {
    res.json({ message: err.message });
  }
});


app.listen(5000, "0.0.0.0", () => {
  console.log("Backend running on 5000");
});