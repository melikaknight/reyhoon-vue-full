const Promise = require('bluebird');
const restaurantsData = require('./restaurants.json');
const Restaurant = require('./restaurant.model');
const Area = require('../area/area.model');
const Address = require('../address/address.model');

const registerRestaurant = async ({ newAddress, newRestaurant }) => {
  // await Restaurant.registerRestaurant(newRestaurant);
  // console.log('#####################');
  // console.log(newRestaurant);
  await Area.registerRestaurant(newRestaurant);
  await newAddress.save();
  // eslint-disable-next-line no-param-reassign
  // newRestaurant.areaId = undefined;
  return newRestaurant.save();
};
const restaurantSeeder = async () => {
  const areas = await Area.list();

  const newRestaurants = restaurantsData.map((restaurant) => {
    const result = areas.filter(ar => ar.slug === restaurant.area);
    if (result) {
      const { _id: areaId } = result[0];
      const newAddress = new Address({
        address: restaurant.address,
        area: areaId,
      });
      const {
        name,
        slug,
        logo,
        coverImage,
        averageRating,
        openingTime,
        closingTime,
      } = restaurant;
      // console.log('#####################');
      // console.log(areaId);
      const newRestaurant = new Restaurant({
        address: newAddress,
        // test: areaId,
        name,
        slug,
        logo,
        coverImage,
        averageRating,
        openingTime,
        closingTime,
      });
      // console.log('#####################');
      // console.log(areaId);
      // console.log(newRestaurant);
      return registerRestaurant({
        newAddress,
        newRestaurant,
      });
    }
    return null;
  });
  return Promise.all(newRestaurants);
};

module.exports = restaurantSeeder;
