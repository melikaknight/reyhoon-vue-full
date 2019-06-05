const Promise = require('bluebird');
const mongoose = require('mongoose');
// const _ = require('lodash');
const httpStatus = require('http-status');
const APIError = require('../../helpers/APIError');
/**
 * Restaurant Schema
 */
const RestaurantSchema = new mongoose.Schema({
  /**
  Mongoose assigns each of your schemas an _id field by default if one is not
  passed into the Schema constructor. The type assigned is an ObjectId to
  coincide with MongoDB's default behavior.
  */
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
  },
  coverImage: {
    type: String,
  },
  openingTime: {
    type: String,
  },
  closingTime: {
    type: String,
  },
  averageRating: {
    type: Number,
    min: 0,
    max: 5,
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
  },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FoodType',
  }],
  menu: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Food',
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
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
RestaurantSchema.method({});

/**
 * Statics
 */
RestaurantSchema.statics = {

  get(id) {
    return this.findById(id)
      .populate('foods')
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }
        const err = new APIError(
          'No such user exists!',
          httpStatus.NOT_FOUND,
          true
        );
        return Promise.reject(err);
      });
  },
  registerFood(newFood) {
    return this.findOneAndUpdate(
      { _id: newFood.restaurant },
      {
        $push: {
          menu: newFood,
        },
      }
    );
  },
  registerComment(newComment) {
    return this.findOneAndUpdate(
      { _id: newComment.restaurant },
      {
        $push: {
          comments: newComment,
        },
      }
    );
  },
  list() {
    return this.find()
      .populate({
        path: 'menu',
        select: 'name price ingredients',
        populate: {
          path: 'foodType',
          select: 'foodType',
        },
      })
      .populate({
        path: 'comments',
        select: 'quality packaging deliveryTime comment',
        populate: {
          path: 'author',
          select: 'fullname username',
        },
      })
      .populate({
        path: 'address',
        select: 'address',
        populate: {
          path: 'area',
          select: 'area slug',
        },
      })
      .select('name slug averageRating openingTime closingTime')
      .exec();
  },
};

module.exports = mongoose.model('Restaurant', RestaurantSchema);
