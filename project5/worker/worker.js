const Redis = require("ioredis");

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: 6379
});

console.log("Worker started...");

setInterval(async () => {
  console.log("Worker checking jobs...");
  // simulate background job
}, 5000);