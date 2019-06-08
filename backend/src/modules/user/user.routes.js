const express = require('express');
const userCtrl = require('./user.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/users - Get list of users */
  .get(userCtrl.list);

router.route('/:userId')
  /** GET /api/users/:userId - Get user */
  .get(userCtrl.get);

module.exports = router;
