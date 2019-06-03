const express = require('express');

const router = express.Router(); // eslint-disable-line new-cap

/** GET /api/health-check - Check service health */
router.get('/health-check', (req, res) => res.send('OK'));

module.exports = router;
