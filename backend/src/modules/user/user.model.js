const mongoose = require('mongoose');
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
 * Statics
 */
UserSchema.statics = {
  // find and return a user model by its _id like: 5cfa8d1b52172f1eff31b1f3
  get(id) {
    return this.list({
      filter: {
        _id: id,
      },
    });
  },
  // find and return a user model by its username like: arsalan
  getByUsername(username) {
    return this.list({
      filter: {
        username,
      },
    });
  },
  // add a new comment to the user comments collection
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
  // get a list of users based on the filter object
  // if no filter is passed, the function returns all the users
  async list({ filter = {} } = {}) {
    const result = await this.find(filter)
      .populate({
        path: 'comments',
        select: 'quality packaging deliveryTime average comment',
      })
      .select('fullname username')
      .exec();
    return result;
  },
};

module.exports = mongoose.model('User', UserSchema);
