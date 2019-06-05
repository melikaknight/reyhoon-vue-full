
const RestaurantCategory = require('./restaurantCategory.model');

function get(req, res, next, id) {
  RestaurantCategory.get(id)
    .then(restaurants => res.json(restaurants));
}

function list(req, res, next) {
  RestaurantCategory.list()
    .then(restaurantCategories => res.json(restaurantCategories))
    .catch(e => next(e));
}

module.exports = {
  get,
  list,
};
