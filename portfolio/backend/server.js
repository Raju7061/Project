const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/contact", require("./routes/contact"));
app.use("/api/profile", require("./routes/profile"));

app.get("/", (req, res) => {
  res.send("Portfolio Backend Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});