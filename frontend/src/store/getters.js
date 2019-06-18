import _ from 'lodash';

const getters = {
  errorMessageGetter: (state) => (state.errorMessage),
  citiesGetter: (state) => (state.cities),
  cityBySlugGetter: (state) => (citySlug) => {
    return state.cities.find(
      city => city.slug === citySlug
    );
  },
  selectedCityFaGetter: (state) => {
    const selectedCityObj = state.cities.find(
      city => city.slug === state.selectedCity
    );
    if (selectedCityObj) {
      return selectedCityObj.city;
    }
    return '';
  },
  cityRestaurantsGetter: (state) => {
    let cityRestaurants = [];
    if (state.cityRestaurants.length) {
      const {
        areas,
      } = state.cityRestaurants[0];
      const cityRestaurantsReducer = (restaurants, currentArea) => {
        return [
          ...restaurants,
          ...currentArea.restaurants,
        ];
      };
      const restaurants = areas.reduce(
        cityRestaurantsReducer,
        [],
      );
      return restaurants;
    }
    return cityRestaurants;
  },
  areaRestaurantsGetter: (state) => state.areaRestaurants,
  filteredAreaRestaurantsGetter: (state) => (searchInput) => {
    return state.filteredAreaRestaurants.filter(
      (restaurant) => new RegExp(searchInput).test(restaurant.name)
    );
  },
  cityRestaurantGetter: (state, getters) => (restaurantSlug) => {
    const cityRestaurants = getters.cityRestaurantsGetter;
    const restaurant = cityRestaurants.filter(
      restaurant => restaurant.slug === restaurantSlug
    );
    if (restaurant.length) {
      return restaurant[0];
    }
    return [];
  },
  bestCityRestaurantsGetter:  (state, getters) => {
    const cityRestaurants = getters.cityRestaurantsGetter;
    const returnCount = 3;
    const sortedCityRestaurants =  cityRestaurants.sort(
      (a, b) => parseFloat(b.totalRating.averageRating) - parseFloat(a.totalRating.averageRating)
    );
    const returnRestaurants =  sortedCityRestaurants.slice(
      0,
      returnCount
    );
    return returnRestaurants;
  },
  featuredFoodTypesGetter: (state) => {
    return state.foodTypes.filter(foodType => foodType.featured);
  },
  regularFoodTypesGetter: (state) => {
    return state.foodTypes.filter(foodType => foodType.featured === false);
  },
  foodTypesByAreaGetter: (state) => (filterInput) => {
    const filteredFoodTypes = state.foodTypesByArea.filter(
      (foodType) => new RegExp(filterInput).test(foodType.foodType)
    );
    const sortedFoodTypes = _.orderBy(filteredFoodTypes, 'selected', ['desc']);
    return sortedFoodTypes;
  },
};

export default getters;