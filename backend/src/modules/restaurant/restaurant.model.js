const mongoose = require('mongoose');

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
  // This is the name of the restaurant in English to be used for our API Calls
  // GET /api/restaurants/berantin instead of GET /api/restaurants/برنتین or
  // GET /api/restaurants/5cf93e8a41a53d590fbed846
  slug: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
  },
  // The image to load on the restaurant page
  coverImage: {
    type: String,
  },
  openingTime: {
    type: String,
  },
  closingTime: {
    type: String,
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
  },
  // This is where we store all the foods that the restaurant serves
  menu: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Food',
  }],
  // This is where we store all types of food the restaurant serves
  foodTypes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FoodType',
  }],
  // Here we store comments that have been posted by our users
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  }],
}, {
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
});


// AverageRating for a restaurant is returned dynamically
// What is returned is the average of each comment's AverageRating virtual property

// eslint-disable-next-line prefer-arrow-callback
// eslint-disable-next-line func-names
RestaurantSchema.virtual('averageRating').get(function () {
  if (this.comments && this.comments.length) {
    const averageRatingReducer = (
      totalAverageRating, { rating }
    ) => totalAverageRating + parseFloat(rating);
    return (
      parseFloat((this.comments.reduce(averageRatingReducer, 0) / this.comments.length).toFixed(1))
    );
  }
  return 0;
});
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
  // Find a restaurant by its slug(berantin, lanjin)
  getBySlug(slug) {
    return this.list({
      filter: {
        slug,
      },
    });
  },
  // Find a restaurant by its _id(5cf93e8a41a53d590fbed846)
  getById(id) {
    return this.list({
      filter: {
        _id: id,
      },
    });
  },
  async getByFoodType(foodTypeId) {
    const result = await this.list({
      filter: {
        foodTypes: {
          $in: foodTypeId,
        },
      },
    });
    return result;
  },
  // This method is used to add a new Food model to the menu field of a certain restaurant
  // 1. Find the restaurant
  // 2. Add the new Food model to the menu
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
  // This method is used to add a new FoodTypeId to the foodtypes field of a certain restaurant
  // 1. Find the restaurant
  // 2. Add the new FoodTypeId to the foodTypes array
  registerFoodType(newFood) {
    return this.findOneAndUpdate(
      { _id: newFood.restaurant },
      {
        $push: {
          foodTypes: newFood.foodType,
        },
      }
    );
  },
  // This method is used to add a new Comment model to the comments field of a certain restaurant
  // 1. Find the restaurant
  // 2. Add the new Comment model to its comments
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
  // This method returns a collection of restaurants
  // You can pass a filter which is the resturant slug and the function would
  // try to find that restaurant
  async list({ filter = {} } = {}) {
    const result = await this.find(filter)
      .populate({
        path: 'foodTypes',
        select: 'foodType slug',
      })
      .populate({
        path: 'menu',
        // What properties to return
        select: 'name price ingredients',
      })
      .populate({
        path: 'comments',
        select: 'quality packaging deliveryTime comment createdAt',
        options: {
          // Newest comments on top
          sort: {
            createdAt: -1,
          },
        },
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
    return result;
  },
};

module.exports = mongoose.model('Restaurant', RestaurantSchema);
