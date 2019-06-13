// This file is used to group all of our filter functions in one place

// Function to filter restaurants within a given area
const filterRestaurantsByArea = async (restaurants, area) => {
  const filteredResults = await restaurants.filter((restaurant) => {
    const {
      address: {
        area: {
          _id,
          slug,
        },
      },
    } = restaurant;
    // eslint-disable-next-line eqeqeq
    return ((_id == area) || (slug == area));
  });
  return filteredResults;
};

// Function to filter restaurants which serve a given array of food types
const filterRestaurantsByCategories = async (restaurants, categories) => {
  const filteredResults = await restaurants.filter((restaurant) => {
    if (restaurant.foodTypes) {
      const result = restaurant.foodTypes.filter(
        foodType => categories.includes(foodType.slug)
      );
      return !!result.length;
    }
    return false;
  });
  return filteredResults;
};

// Function to filter the collection of restaurants based on
// passed filters(area, categoreis, ...)
const filterRestaurants = async (restaurants, options) => {
  let filteredResults;
  const {
    area,
    categories,
  } = options;
  filteredResults = (area)
    ? await filterRestaurantsByArea(restaurants, area)
    : restaurants;
  filteredResults = (categories.length)
    ? await filterRestaurantsByCategories(filteredResults, categories)
    : filteredResults;
  return filteredResults;
};

module.exports = {
  filterRestaurants,
};
