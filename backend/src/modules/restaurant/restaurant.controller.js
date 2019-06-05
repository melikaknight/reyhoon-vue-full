const Restaurant = require('./restaurant.model');

/**
 * Get Restaurant
 * @returns {Restaurant}
 */
function get(req, res, next, id) {
  Restaurant.get(id)
    .then(restaurant => res.json(restaurant));
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Restaurant.list({ limit, skip })
    .then(users => res.json(users))
    .catch(e => next(e));
}

module.exports = {
  get,
  list,
};
