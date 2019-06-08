// To help us to respond with correct HTTP status code
const httpStatus = require('http-status');
// importing our API Error Handler
const APIError = require('../../helpers/APIError');
// importing our Restaurnat model
const Restaurant = require('./restaurant.model');
// importing our Comment Model
const Comment = require('../comment/comment.model');
// importing our User Model
const User = require('../user/user.model');
// imporing our Area Model
const Area = require('../area/area.model');
// importing our Address Model
const Address = require('../address/address.model');
// importing our filter functions
const Filter = require('./restaurant.filters');


/**
 * Get details of a restaurant
 * possible query parameter is restaurantId which can either be
 * it's slug(berantin)
 * @returns {Restaurant}
 */
function get(req, res, next) {
  // extracting slug from request
  // Get /restaurants/:slug
  const { slug } = req.params;
  Restaurant.getBySlug(slug).then(
    // eslint-disable-next-line consistent-return
    async (restaurant) => {
      if (restaurant.length) {
        return res.json(restaurant[0]);
      }
      const err = new APIError(
        'No such restaurant exists!',
        httpStatus.NOT_FOUND,
        true
      );
      next(err);
    }
  );
}

/**
 * Get comments of a restaurant
 * possible query parameter is restaurantId which can be
 * it's slug(berantin)
 * @returns {Comments}
 */
function getComments(req, res, next) {
  // extracting slug from request
  // Get /restaurants/:slug/comments
  const { slug } = req.params;
  Restaurant.getBySlug(slug).then(
    // eslint-disable-next-line consistent-return
    async (restaurant) => {
      if (restaurant.length) {
        return res.json(restaurant[0].comments);
      }
      const err = new APIError(
        'No such restaurant exists!',
        httpStatus.NOT_FOUND,
        true
      );
      next(err);
    }
  );
}

/**
 * Post comment for a restaurant
 * possible query parameter is slug which is used to find the restaurant and it
 * can be it's slug(berantin). It should also receive a comment object
 */
async function postComment(req, res, next) {
  // extracting slug from request
  // Post /restaurants/:slug/comment
  const { slug } = req.params;
  const {
    author,
    quality,
    packaging,
    deliveryTime,
    comment,
  } = req.body;

  const restaurant = await Restaurant.getBySlug(slug).then(
    // eslint-disable-next-line consistent-return
    (rst) => {
      if (rst.length) {
        return rst[0];
      }
      const err = new APIError(
        'No such restaurant exists!',
        httpStatus.NOT_FOUND,
        true
      );
      next(err);
    }
  );
  const user = await User.getByUsername(author).then(
    // eslint-disable-next-line consistent-return
    (usr) => {
      if (usr.length) {
        return usr[0];
      }
      const err = new APIError(
        'No such user exists!',
        httpStatus.NOT_FOUND,
        true
      );
      next(err);
    }
  );
  const newComment = new Comment({
    author: user._id,
    restaurant: restaurant._id,
    quality,
    packaging,
    deliveryTime,
    comment,
  });
  await Restaurant.registerComment(newComment);
  await User.registerComment(newComment);
  return res.json(newComment.save());
}

/**
 * Get a list of restaurants.
 * possible search paramaters are :
 *  area => to return restaurants within a specific area like saadat-abad
 *  category => to return restaurants which serve a specific array of foods
 *    like pizza, irani, ...
 * @returns {Restaurants[]}
 */
function list(req, res, next) {
  // extracting area & category from request
  // Get /restaurants?area=saadat-abad&category=pizza,irani
  const { area, category } = req.query;

  // Spread category values into an array
  const categories = (category)
    ? category.split(',')
    : [];

  // Calling static list method on our Restaurant model to return the results
  // If you specify area and/or category it will return resturants within
  // that area or/and the restaurant which serve a particular type of food.
  Restaurant.list({ area, categories })
    .then(
      // We received a list of all restaurants now we need to filter them out
      // depending on area or category IF they are present
      async (restaurants) => {
        const result = (area || categories)
          ? await Filter.filterRestaurants(restaurants, { area, categories })
          : restaurants;
        return res.json(result);
      }
    )
    .catch(e => next(e));
}

// Creates a new restaurant
// 1. checks to see area is valid
// 2. creates a new Address Model
// 3. creates a new Restaruant Model
// 4. add the newly created restaurant to Areas model
// 5. saves the new address to the DB
// 6. saves the new restaruant to the DB

// eslint-disable-next-line consistent-return
async function create(req, res, next) {
  const {
    name,
    slug,
    address,
    area,
    logo,
    coverImage,
    openingTime,
    closingTime,
  } = req.body;
  const areaId = await Area.getBySlug(area).then(
    // eslint-disable-next-line consistent-return
    (areas) => {
      if (areas.length) { return areas[0]._id; }
      const err = new APIError(
        'No such area exists!',
        httpStatus.NOT_FOUND,
        true
      );
      return next(err);
    }
  );
  if (areaId) {
    const newAddress = new Address({
      address,
      area: areaId,
    });
    const newRestaurant = new Restaurant({
      address: newAddress,
      name,
      slug,
      logo,
      coverImage,
      openingTime,
      closingTime,
    });
    await Area.registerRestaurant(newRestaurant);
    await newAddress.save();
    return res.json(newRestaurant.save());
  }
}

module.exports = {
  get,
  list,
  create,
  getComments,
  postComment,
};
