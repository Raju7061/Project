const express = require("express");
const multer = require("multer");
const path = require("path");
const pool = require("../db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

/* MULTER CONFIG */
const storage = multer.diskStorage({
  destination: path.join(__dirname, "../uploads"),
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/\s+/g, "_");
    cb(null, Date.now() + "-" + safeName);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files allowed"), false);
  },
});

/* GET LOGGED-IN USER PROFILE */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, username, email, profile_image FROM users WHERE id = $1",
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("PROFILE FETCH ERROR:", err);
    res.status(500).json({ error: "Fetch failed" });
  }
});

/* UPLOAD PROFILE IMAGE */
router.post("/upload", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    await pool.query(
      "UPDATE users SET profile_image = $1 WHERE id = $2",
      [imageUrl, req.user.id]
    );

    res.status(200).json({
      success: true,
      profile_image: imageUrl,
    });
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ error: "Upload failed" });
  }
});

module.exports = router;