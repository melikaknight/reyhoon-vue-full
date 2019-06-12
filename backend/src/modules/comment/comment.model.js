const mongoose = require('mongoose');

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
}, {
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});

// This field is dynamically generated and is the average rating of a comment
// eslint-disable-next-line func-names
CommentSchema.virtual('rating').get(function () {
  const {
    quality,
    packaging,
    deliveryTime,
  } = this;
  return parseFloat(((quality + packaging + deliveryTime) / 3).toFixed(1));
});
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
    return this.findById(id).exec();
  },
};

module.exports = mongoose.model('Comment', CommentSchema);
