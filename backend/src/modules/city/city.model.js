const mongoose = require('mongoose');
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

CitySchema.statics = {

  // Find a city by its slug(tehran, shiraz)
  getBySlug(slug) {
    return this.list({
      filter: {
        slug,
      },
    });
  },
  // Find a city by its _id
  get(id) {
    return this.list({
      filter: {
        _id: id,
      },
    });
  },
  // register a new covered area in a city
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
  async list({ filter = {} } = {}) {
    const result = await this.find(filter)
      .populate({
        path: 'areas',
        select: 'area slug',
        populate: {
          path: 'restaurants',
          select: 'name slug logo coverImage openingTime closingTime',
          populate: [
            {
              path: 'address',
              select: 'address',
            },
            {
              path: 'foodTypes',
              select: 'foodType slug',
              // options: {
              //   sort: {
              //     foodType: 1,
              //   },
              // },
            },
            {
              path: 'comments',
              select: 'quality packaging deliveryTime rating comment createdAt',
              populate: {
                path: 'author',
                select: 'fullname',
              },
            },
            {
              path: 'menu',
              select: 'name price ingredients image_url',
              populate: {
                path: 'foodType',
                select: 'foodType _id',
              },
              // options: {
              //   sort: {
              //     'foodType.foodType': 1,
              //   },
              // },
            },
          ],
        },
      })
      .select('city slug')
      .exec();
    return result;
  },
};

module.exports = mongoose.model('City', CitySchema);
