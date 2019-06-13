const mongoose = require('mongoose');

/**
 * FoodType Schema
 */
const FoodTypeSchema = new mongoose.Schema({
  foodType: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
    required: true,
    default: false,
  },
  cardImageUrl: {
    type: String,
  },
  coverImageUrl: {
    type: String,
  },
}, { timestamps: true });

/**
 * Statics
 */
FoodTypeSchema.statics = {
  getBySlug(slug) {
    return this.list({
      filter: {
        slug,
      },
    });
  },
  getById(id) {
    return this.list({
      filter: {
        _id: id,
      },
    });
  },
  async list({ filter = {} } = {}) {
    const result = await this.find(filter)
      .select('-createdAt -updatedAt -__v')
      .exec();
    return result;
  },
};

module.exports = mongoose.model('FoodType', FoodTypeSchema);
