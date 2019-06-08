const express = require('express');
const cityCtrl = require('./city.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/cities - Get list of covered cities */
  .get(cityCtrl.list);

router.route('/:citySlug')
  /** GET /api/cities/:citySlug - Get restaurants of a certain city */
  .get(cityCtrl.get);

module.exports = router;
