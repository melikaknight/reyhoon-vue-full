const Promise = require('bluebird');
const mongoose = require('mongoose');
// const _ = require('lodash');
const httpStatus = require('http-status');
const APIError = require('../../helpers/APIError');
/**
 * City Schema
 */
const CitySchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  areas: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Area',
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
CitySchema.method({});

/**
 * Statics
 */
CitySchema.statics = {

  get(id) {
    return this.findById(id)
      .populate('areas')
      .exec()
      .then((city) => {
        if (city) {
          return city;
        }
        const err = new APIError(
          'No such city exists!',
          httpStatus.NOT_FOUND,
          true
        );
        return Promise.reject(err);
      });
  },
  registerArea(newArea) {
    return this.findOneAndUpdate(
      { _id: newArea.city },
      {
        $push: {
          areas: newArea,
        },
      }
    );
  },
  // returns a list of all cities
  list() {
    return this.find()
      .populate({
        path: 'areas',
        select: 'area',
      })
      .select('city slug')
      .exec();
  },
};

module.exports = mongoose.model('City', CitySchema);
