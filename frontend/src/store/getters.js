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
  bestCityRestaurantsGetter:  (state, getters) => {
    const cityRestaurants = getters.cityRestaurantsGetter;
    const returnCount = 3;
    const sortedCityRestaurants =  cityRestaurants.sort(
      (a, b) => parseFloat(b.averageRating) - parseFloat(a.averageRating)
    );
    const returnRestaurants =  sortedCityRestaurants.slice(
      0,
      returnCount
    );
    return returnRestaurants;
  } ,
};

export default getters;