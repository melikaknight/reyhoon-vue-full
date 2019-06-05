const Promise = require('bluebird');
const mongoose = require('mongoose');
// const _ = require('lodash');
const httpStatus = require('http-status');
const APIError = require('../../helpers/APIError');
/**
 * RestaurantCategory Schema
 */
const RestaurantCategorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
}, { timestamps: true });

/**
  Database logic should be encapsulated within the data model. Mongoose provides
  2 ways of doing this, methods and statics. Methods adds an instance method to
  documents whereas Statics adds static "class" methods to the Models itself.
*/

/**
 * Methods
 */
RestaurantCategorySchema.method({});

/**
 * Statics
 */
RestaurantCategorySchema.statics = {

  // returns a list of restaurants with a certain category
  get(id) {
    return this.findById(id)
      .populate('restaurants')
      .exec()
      .then((category) => {
        if (category) {
          return category;
        }
        const err = new APIError(
          'No such category exists!',
          httpStatus.NOT_FOUND,
          true
        );
        return Promise.reject(err);
      });
  },

  // returns a list of all restaurant categories
  list() {
    return this.find().exec();
  },
};

module.exports = mongoose.model('RestaurantCategory', RestaurantCategorySchema);
