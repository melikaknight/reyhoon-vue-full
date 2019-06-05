const Promise = require('bluebird');
const FoodType = require('./foodType.model');
const foodTypesData = require('./foodTypes.json');

const foodTypeSeeder = async () => {
  const newFoodTypes = foodTypesData.map((foodType) => {
    const newFoodType = new FoodType(foodType);
    return newFoodType.save();
  });
  return Promise.all(newFoodTypes);
};

module.exports = foodTypeSeeder;
