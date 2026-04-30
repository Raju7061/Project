const { Pool } = require("pg");

// Only load dotenv in local development
if (process.env.NODE_ENV !== 'production') {
  require("dotenv").config();
}

const pool = new Pool({
  // These will now be populated by Kubernetes Secret injection
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT || 5432),
});

pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL via K8s Secrets"))
  .catch(err => console.error("❌ DB Connection Error:", err.message));

module.exports = pool;