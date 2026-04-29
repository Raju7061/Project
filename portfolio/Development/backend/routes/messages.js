const express = require('express');
const router = express.Router();
const axios = require('axios');

// GET: Fetch data from Elasticsearch
router.get('/', async (req, res) => {
  try {
    const response = await axios.post('http://portfolio-elasticsearch:9200/portfolio-db.public.contact_messages/_search', {
      size: 50,
      sort: [{ created_at: { order: "desc" } }], 
      query: { match_all: {} }
    });

    const messages = response.data.hits.hits.map(hit => hit._source);
    res.json(messages);
  } catch (err) {
    console.error("ES Fetch Error:", err.message);
    if (err.response && err.response.status === 404) {
      return res.json([]);
    }
    res.status(500).json({ error: "Search engine unreachable" });
  }
});

module.exports = router;