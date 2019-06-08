const Promise = require('bluebird');
const restaurantsData = require('./restaurants.json');
const Restaurant = require('./restaurant.model');
const Area = require('../area/area.model');
const Address = require('../address/address.model');

const registerRestaurant = async ({ newAddress, newRestaurant }) => {
  await Area.registerRestaurant(newRestaurant);
  await newAddress.save();
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
        openingTime,
        closingTime,
      } = restaurant;
      const newRestaurant = new Restaurant({
        address: newAddress,
        name,
        slug,
        logo,
        coverImage,
        openingTime,
        closingTime,
      });
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
