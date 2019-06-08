const mongoose = require('mongoose');
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

  // Find an area by its slug(saadat-abad, farmaniye)
  getBySlug(slug) {
    return this.list({
      filter: {
        slug,
      },
    });
  },
  // Find an area by its _id(5cf93e8a41a53d590fbed846)
  get(id) {
    return this.list({
      filter: {
        _id: id,
      },
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
  async list({ filter = {} } = {}) {
    const result = await this.find(filter)
      .populate({
        path: 'city',
        select: 'city slug',
      })
      .populate({
        path: 'restaurants',
        select: '-menu -comments -updatedAt -createdAt -__v',
        populate: {
          path: 'address',
          select: 'address',
        },
      })
      .select('area slug')
      .exec();
    return result;
  },
};

module.exports = mongoose.model('Area', AreaSchema);
