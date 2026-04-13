const express = require("express");
const multer = require("multer");
const path = require("path");
const pool = require("../db");

const router = express.Router();

/* =========================
   MULTER CONFIG
========================= */
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

/* =========================
   UPLOAD PROFILE IMAGE
========================= */
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    await pool.query(
      "INSERT INTO profile (image_url) VALUES ($1)",
      [imageUrl]
    );

    res.status(200).json({
      success: true,
      image_url: imageUrl,
    });
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    res.status(500).json({ error: "Upload failed" });
  }
});

/* =========================
   FETCH LATEST PROFILE IMAGE
========================= */
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT image_url FROM profile ORDER BY id DESC LIMIT 1"
    );

    if (result.rows.length === 0) {
      return res.json({ image_url: null });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("FETCH ERROR:", err);
    res.status(500).json({ error: "Fetch failed" });
  }
});

module.exports = router;
