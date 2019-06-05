const Promise = require('bluebird');
const mongoose = require('mongoose');
// const _ = require('lodash');
const httpStatus = require('http-status');
const APIError = require('../../helpers/APIError');
/**
 * Comment Schema
 */
const CommentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
  },
  quality: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
  },
  packaging: {
    type: Number,
  },
  deliveryTime: {
    type: Number,
  },
  comment: {
    type: String,
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
CommentSchema.method({});

/**
 * Statics
 */
CommentSchema.statics = {

  get(id) {
    return this.findById(id)
      .exec()
      .then((comment) => {
        if (comment) {
          return comment;
        }
        const err = new APIError(
          'No such comment exists!',
          httpStatus.NOT_FOUND,
          true
        );
        return Promise.reject(err);
      });
  },
};

module.exports = mongoose.model('Comment', CommentSchema);
