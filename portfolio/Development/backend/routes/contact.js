const express = require("express");
const router = express.Router();
const pool = require("../db");



const axios = require('axios');

// Route to fetch messages from Elasticsearch
router.get('/messages', async (req, res) => {
  try {
    const response = await axios.post('http://portfolio-elasticsearch:9200/portfolio-db.public.contact_messages/_search', {
      size: 50,
      sort: [{ created_at: { order: "desc" } }], // Newest first
      query: { match_all: {} }
    });

    // Extracting the unwrapped data from ES response
    const messages = response.data.hits.hits.map(hit => hit._source);
    res.json(messages);
  } catch (err) {
    console.error("Elasticsearch Fetch Error:", err);
    res.status(500).json({ error: "Failed to fetch messages from search engine" });
  }
});

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO contact_messages (name, email, message) VALUES ($1, $2, $3) RETURNING *",
      [name, email, message]
    );

    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.error("CONTACT ERROR:", err);
    res.status(500).json({ error: "Database error" });
  }
});

module.exports = router;