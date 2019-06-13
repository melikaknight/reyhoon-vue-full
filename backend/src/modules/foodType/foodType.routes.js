const express = require('express');
const foodTypeCtrl = require('./foodType.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/restaurants - Get list of restaurants */
  /* This route can process area/category search parameters */
  .get(foodTypeCtrl.list);

module.exports = router;
