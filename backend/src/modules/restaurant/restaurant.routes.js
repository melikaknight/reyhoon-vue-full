const express = require('express');
const restaurantCtrl = require('./restaurant.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/restaurants - Get list of restaurants */
  .get(restaurantCtrl.list);

router.route('/:restaurantId')
  /** GET /api/restaurants/:restaurantId - Get restaurant */
  .get(restaurantCtrl.get);

module.exports = router;
