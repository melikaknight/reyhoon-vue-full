const Promise = require('bluebird');
const mongoose = require('mongoose');
// const _ = require('lodash');
const httpStatus = require('http-status');
const APIError = require('../../helpers/APIError');
/**
 * FoodType Schema
 */
const FoodTypeSchema = new mongoose.Schema({
  foodType: {
    type: String,
    required: true,
  },
  slug: {
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
FoodTypeSchema.method({});

/**
 * Statics
 */
FoodTypeSchema.statics = {

  get(id) {
    return this.findById(id)
      .exec()
      .then((foodType) => {
        if (foodType) {
          return foodType;
        }
        const err = new APIError(
          'No such food type exists!',
          httpStatus.NOT_FOUND,
          true
        );
        return Promise.reject(err);
      });
  },
  list() {
    return this.find().exec();
  },
};

module.exports = mongoose.model('FoodType', FoodTypeSchema);
