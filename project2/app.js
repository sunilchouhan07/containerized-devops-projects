const express = require("express");
const app = express();

const users = [
  { id: 1, name: "Sunil" },
  { id: 2, name: "DevOps Learner" }
];

app.get("/", (req, res) => {
  res.send("🚀 Project 2 Node.js Multi-Stage App");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.listen(5000, "0.0.0.0", () => {
  console.log("Server running on port 5000");
});
