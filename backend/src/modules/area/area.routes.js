const express = require('express');
const areaCtrl = require('./area.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/areas - Get list of covered areas */
  .get(areaCtrl.list);

router.route('/:areaId')
  /** GET /api/areas/:areaId - Get restaurants of a certain area */
  .get(areaCtrl.get);

module.exports = router;
