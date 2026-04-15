const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// CORRECT: Kubernetes environment ke liye origins update karein
app.use(cors({
  origin: ["http://localhost:3000", "https://raju.local", "http://raju.local"],
  credentials: true
}));

app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contact", require("./routes/contact"));
app.use("/api/profile", require("./routes/profile"));

app.get("/", (req, res) => {
  res.send("Portfolio Backend is Healthy and Running");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong on the server Sorry!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});