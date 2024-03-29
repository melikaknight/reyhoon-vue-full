// This file is used to group all of our filter functions in one place
const parseBool = require('parse-bool');
const Restaurant = require('../restaurant/restaurant.model.js');
const City = require('../city/city.model');

const filterFeaturedFoodTypes = async (foodTypes, featured) => {
  const filteredResults = await foodTypes.filter(
    foodType => foodType.featured === featured
  );
  return filteredResults;
};

const filterCityRestaurants = async (foodTypesWithRestaurants, citySlug) => {
  const cityRestaurantsByArea = await City.getBySlug(citySlug);
  const cityRestaurantsReducer = (restaurantIds, currentArea) => {
    const currentAreaRestaurantIds = currentArea.restaurants.map(
      restaurant => restaurant._id.toString()
    );
    return [
      ...restaurantIds,
      ...currentAreaRestaurantIds,
    ];
  };
  const cityRestaurants = cityRestaurantsByArea[0].areas.reduce(
    cityRestaurantsReducer,
    [],
  );

  const filteredCityRestaurants = foodTypesWithRestaurants.map((foodType) => {
    const allowedCityRestaurants = foodType.restaurants.filter(
      restaurant => (cityRestaurants.includes(restaurant.id))
    );

    return ({
      ...foodType,
      restaurantsCount: allowedCityRestaurants.length,
      restaurants: allowedCityRestaurants,
    });
  });
  return filteredCityRestaurants;
};

const filterCityRestaurantsByArea = async (foodTypesWithCityRestaurants, areaSlug) => {
  // debugger;
  const foodTypesFilteredByArea = foodTypesWithCityRestaurants.map((foodType) => {
    const filteredRestaurants = foodType.restaurants.filter(
      restaurant => restaurant.address.area.slug === areaSlug
    );
    return {
      ...foodType,
      restaurants: filteredRestaurants,
      restaurantsCount: filteredRestaurants.length,
    };
  });
  return foodTypesFilteredByArea;
};

const addRestaurantsByFoodType = async (foodTypes) => {
  const foodTypesWithRestaurants = await foodTypes.map(async (foodType) => {
    const restaurants = await Restaurant.getByFoodType(foodType._id);
    return ({
      ...foodType._doc,
      restaurants,
    });
  });
  return Promise.all(foodTypesWithRestaurants);
};

const filterOutRestaurants = async (filteredResults) => {
  const foodTypesWithOnlyCounts = filteredResults.map(foodType => ({
    ...foodType,
    restaurants: [],
  }));
  return foodTypesWithOnlyCounts;
};

// Function to filter the collection of restaurants based on
// passed filters(area, categoreis, ...)
const filterFoodTypes = async (foodTypes, options) => {
  let filteredResults;
  const {
    featured,
    citySlug,
    areaSlug,
    countsOnly,
  } = options;
  // eslint-disable-next-line prefer-const
  filteredResults = (featured)
    ? await filterFeaturedFoodTypes(foodTypes, parseBool(featured))
    : foodTypes;
  filteredResults = await addRestaurantsByFoodType(filteredResults);

  filteredResults = (citySlug)
    ? await filterCityRestaurants(filteredResults, citySlug)
    : filteredResults;

  filteredResults = (areaSlug)
    ? await filterCityRestaurantsByArea(filteredResults, areaSlug)
    : filteredResults;

  filteredResults = (parseBool(countsOnly))
    ? await filterOutRestaurants(filteredResults)
    : filteredResults;
  return filteredResults;
};

module.exports = {
  filterFoodTypes,
};
