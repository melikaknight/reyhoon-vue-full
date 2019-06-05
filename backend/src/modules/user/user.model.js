const Promise = require('bluebird');
const mongoose = require('mongoose');
// const _ = require('lodash');
const httpStatus = require('http-status');
const APIError = require('../../helpers/APIError');
/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
  /**
  Mongoose assigns each of your schemas an _id field by default if one is not
  passed into the Schema constructor. The type assigned is an ObjectId to
  coincide with MongoDB's default behavior.
  */
  fullname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
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
UserSchema.method({});

/**
 * Statics
 */
UserSchema.statics = {

  get(id) {
    return this.findById(id)
      .populate('comments')
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
  registerComment(newComment) {
    return this.findOneAndUpdate(
      { _id: newComment.author },
      {
        $push: {
          comments: newComment,
        },
      }
    );
  },
  // https://mongoosejs.com/docs/populate.html
  list() {
    return this.find()
      .populate({
        path: 'comments',
        select: 'quality packaging deliveryTime comment',
        populate: {
          path: 'restaurant',
          select: 'name',
        },
      })
      .select('fullname username')
      .exec();
  },
};

module.exports = mongoose.model('User', UserSchema);
