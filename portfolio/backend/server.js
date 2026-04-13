/*const express = require("express");
const cors = require("cors");
require("dotenv").config();

const contactRoute = require("./routes/contact");
app.use("/uploads", express.static("uploads"));
app.use("/api/profile", require("./routes/profile"));


const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Portfolio Backend Running");
});

// API Routes
app.use("/api/contact", contactRoute);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
*/

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Serve uploaded images
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/contact", require("./routes/contact"));
app.use("/api/profile", require("./routes/profile"));

// Test route
app.get("/", (req, res) => {
  res.send("Portfolio Backend Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


