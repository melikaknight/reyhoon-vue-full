const Promise = require('bluebird');
const mongoose = require('mongoose');
// const _ = require('lodash');
const httpStatus = require('http-status');
const APIError = require('../../helpers/APIError');
/**
 * Area Schema
 */
const AreaSchema = new mongoose.Schema({
  area: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  city: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City',
  },
  restaurants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
  }],
}, { timestamps: true });

/**
  Database logic should be encapsulated within the data model. Mongoose provides
  2 ways of doing this, methods and statics. Methods adds an instance method to
  documents whereas Statics adds static "class" methods to the Models itself.
*/

/**
 * Methods
 */
AreaSchema.method({});

/**
 * Statics
 */
AreaSchema.statics = {

  // returns a list of restaurants within a certain area
  get(id) {
    return this.findById(id)
      .populate('city', ['city', 'slug'])
      .exec()
      .then((address) => {
        if (address) {
          return address;
        }
        const err = new APIError(
          'No such restaurant address exists!',
          httpStatus.NOT_FOUND,
          true
        );
        return Promise.reject(err);
      });
  },
  registerRestaurant(newRestaurant) {
    return this.findOneAndUpdate(
      { _id: newRestaurant.address.area },
      {
        $push: {
          restaurants: newRestaurant,
        },
      }
    );
  },
  // returns a list of all areas
  list() {
    return this.find()
      .populate({
        path: 'city',
        select: 'city slug',
      })
      .populate({
        path: 'restaurants',
        select: '-categories -menu -comments -updatedAt -createdAt -__v',
        populate: {
          path: 'address',
          select: 'address',
        },
      })
      .select('area slug')
      .exec();
  },
};

module.exports = mongoose.model('Area', AreaSchema);
