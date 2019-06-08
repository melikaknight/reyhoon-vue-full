// To help us to respond with correct HTTP status code
const httpStatus = require('http-status');
// importing our API Error Handler
const APIError = require('../../helpers/APIError');
// importing our user model
const User = require('./user.model');

/**
 * Get user
 * @returns {User}
 */
function get(req, res, next) {
  const { userId } = req.params;
  User.get(userId)
    .then(
    // eslint-disable-next-line consistent-return
      (usr) => {
        if (usr.length) {
          return res.json(usr[0]);
        }
        const err = new APIError(
          'No such user exists!',
          httpStatus.NOT_FOUND,
          true
        );
        next(err);
      }
    );
}

/**
 * Get user list.
 * @returns {User[]}
 */
function list(req, res, next) {
  User.list()
    .then(users => res.json(users))
    .catch(e => next(e));
}

module.exports = {
  get,
  list,
};
