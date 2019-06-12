const express = require('express');
const validateRequest = require('express-validation');
const restaurantCtrl = require('./restaurant.controller');
const queryValidator = require('./restaurant.validator');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/restaurants - Get list of restaurants */
  /* This route can process area/category search parameters */
  .get(restaurantCtrl.list);

router.route('/:slug')
  /** GET /api/restaurants/:slug - Get a restaurant by its slug */
  /** GET /api/restaurants/lanjin */
  .get(restaurantCtrl.get);

router.route('/:slug/comments')
/** GET /api/restaurants/:slug/comments - Get a restaurant comments */
/** GET /api/restaurants/lanjin/comments */
  .get(restaurantCtrl.getComments);

// Post a new comment
/**
  @property {string} req.body.author - slug of the posting user
  @property {number} req.body.quality
  @property {number} req.body.packaging
  @property {number} req.body.deliveryTime
  @property {string} req.body.comment - Optional
*/
router.route('/:slug/comments')
  /** Post /api/restaurants/:slug/comments - Get a restaurant comments */
  /** Post /api/restaurants/lanjin/comments */
  .post(
    validateRequest(queryValidator.newCommentValidator),
    restaurantCtrl.postComment
  );

// Register a new restaruant
/**
  @property {string} req.body.name - name of the restaurant in Persian => صوفی
  @property {string} req.body.slug - name of the restaurant in English => soofi
  @property {string} req.body.address - address of the restaurant
  @property {string} req.body.area - area name in English => saadat-abad
  @property {string} req.body.logo
  @property {string} req.body.coverImage
  @property {string} req.body.openingTime => "13:00"
  @property {string} req.body.closingTime => "23:30"
*/
router.route('/create')
  /** Post /api/restaurants/create */
  .post(
    validateRequest(queryValidator.newRestaurantValidator),
    restaurantCtrl.create
  );

module.exports = router;
