const Promise = require('bluebird');
const mongoose = require('mongoose');
// const _ = require('lodash');
const httpStatus = require('http-status');
const APIError = require('../../helpers/APIError');
/**
 * Food Schema
 */
const FoodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  ingredients: {
    type: String,
  },
  image_url: {
    type: String,
  },
  foodType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FoodType',
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
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
FoodSchema.method({});

/**
 * Statics
 */
FoodSchema.statics = {

  get(id) {
    return this.findById(id)
      .exec()
      .then((food) => {
        if (food) {
          return food;
        }
        const err = new APIError(
          'No such food exists!',
          httpStatus.NOT_FOUND,
          true
        );
        return Promise.reject(err);
      });
  },
};

module.exports = mongoose.model('Food', FoodSchema);
