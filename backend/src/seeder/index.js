const isCollectionEmpty = require('../helpers/checkEmptyCollection');
const userSeeder = require('../modules/user/user.seeder');
const citySeeder = require('../modules/city/city.seeder');
const areaSeeder = require('../modules/area/area.seeder');
const foodTypeSeeder = require('../modules/foodType/foodType.seeder');
const restaurantSeeder = require('../modules/restaurant/restaurant.seeder');
const foodSeeder = require('../modules/food/food.seeder');
const commentSeeder = require('../modules/comment/comment.seeder');

// this function checks every collection in our database and seeds them
// if the collection is empty
const dbSeeder = async () => {
  if (await isCollectionEmpty('users')) {
    await userSeeder();
  }
  if (await isCollectionEmpty('cities')) {
    await citySeeder();
  }
  if (await isCollectionEmpty('areas')) {
    await areaSeeder();
  }
  if (await isCollectionEmpty('foodtypes')) {
    await foodTypeSeeder();
  }
  if (await isCollectionEmpty('restaurants')) {
    await restaurantSeeder();
  }
  if (await isCollectionEmpty('foods')) {
    await foodSeeder();
  }
  if (await isCollectionEmpty('comments')) {
    await commentSeeder();
  }
};

module.exports = dbSeeder;
