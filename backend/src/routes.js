const express = require('express');
const userRoutes = require('./modules/user/user.routes');
const areaRoutes = require('./modules/area/area.routes');
const cityRoutes = require('./modules/city/city.routes');
const restaurantRoutes = require('./modules/restaurant/restaurant.routes');

const router = express.Router(); // eslint-disable-line new-cap

/** GET /api/health-check - Check service health */
router.get('/health-check', (req, res) => res.send('OK'));

// mount user routes at /users
router.use('/users', userRoutes);

// mount user routes at /cities
router.use('/cities', cityRoutes);

// mount user routes at /areas
router.use('/areas', areaRoutes);

// mount restaurant routes at /restaurants
router.use('/restaurants', restaurantRoutes);

module.exports = router;
