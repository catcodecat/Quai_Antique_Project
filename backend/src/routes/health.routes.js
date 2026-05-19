const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'API Quai Antique active',
  });
});

module.exports = router;
