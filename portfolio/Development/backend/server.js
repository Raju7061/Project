const express = require("express");
const cors = require("cors");
const path = require("path"); // Added for path handling
require("dotenv").config();

const app = express();

// CORS Configuration
// Kubernetes Ingress aur local development dono ko support karne ke liye
app.use(cors({
  origin: [
    "http://localhost:3000", 
    "https://raju.local", 
    "http://raju.local",
    "http://localhost:5173" // Vite default port agar aap use kar rahe hain
  ],
  credentials: true
}));

app.use(express.json());

// Profile images handle karne ke liye static folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// --- ROUTES REGISTRATION ---

// Auth Routes (Login/Signup)
app.use("/api/auth", require("./routes/auth"));

// Contact Routes (Postgres - Writing messages)
app.use("/api/contact", require("./routes/contact"));

// Messages Routes (Elasticsearch - Reading messages)
// Ab aapka frontend /api/messages par hit karega
app.use("/api/messages", require("./routes/messages"));

// Profile Routes (User profile/Uploads)
app.use("/api/profile", require("./routes/profile"));

// Health Check
app.get("/", (req, res) => {
  res.send("Portfolio Backend is Healthy and Running");
});

// 404 Handler (Agar koi route match na kare)
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(500).json({ 
    error: 'Something went wrong on the server!',
    message: err.message 
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`🚀 API Base Path: http://localhost:${PORT}/api`);
});