const Promise = require('bluebird');
const foodsData = require('./foods.json');
const Food = require('./food.model');
const FoodType = require('../foodType/foodType.model');
const Restaurant = require('../restaurant/restaurant.model');

const foodSeeder = async () => {
  const restaurants = await Restaurant.list();
  const foodTypes = await FoodType.list();
  const newFoods = foodsData.map((food) => {
    const resResult = restaurants.filter(res => res.slug === food.restaurant);
    const ftResult = foodTypes.filter(ft => ft.slug === food.foodType);
    if (resResult && ftResult) {
      const { _id: restaurantId } = resResult[0];
      const { _id: foodTypeId } = ftResult[0];
      const {
        name,
        price,
        ingredients,
        image,
      } = food;
      const newFood = new Food({
        foodType: foodTypeId,
        restaurant: restaurantId,
        name,
        price,
        ingredients,
        image,
      });
      return Restaurant.registerFood(newFood).then(() => newFood.save());
    }
    return null;
  });
  return Promise.all(newFoods);
};

module.exports = foodSeeder;
