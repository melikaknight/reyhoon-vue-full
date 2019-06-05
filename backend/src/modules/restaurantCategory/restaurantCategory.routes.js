const express = require('express');
const restaurantCategoryCtrl = require('./restaurantCategory.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/categories - Get list of restaurant categories */
  .get(restaurantCategoryCtrl.list);

router.route('/:categoryId')
  /** GET /api/categories/:categoryId - Get restaurants of a certain category */
  .get(restaurantCategoryCtrl.get);

module.exports = router;
