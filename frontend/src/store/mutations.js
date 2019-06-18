/*
  The only way to actually change state in a Vuex store is by committing a 
  mutation. Vuex mutations are very similar to events: each mutation has a 
  string type and a handler. The handler function is where we perform actual 
  state modifications, and it will receive the state as the first argument.
  You can pass an additional argument to store.commit, which is called the 
  payload for the mutation.
  In most cases, the payload should be an object so that it can contain multiple 
  fields, and the recorded mutation will also be more descriptive
*/
const mutations = {
  SET_ERROR(state, { error }) {
    state.errorMessage = error;
  },
  SET_CITIES(state, { cities }) {
    state.cities = cities;
  },
  SET_SELECTED_CITY(state, { selectedCity }){
    state.selectedCity = selectedCity;
  },
  SET_CITY_RESTAURANTS(state, { cityRestaurants }) {
    state.cityRestaurants = cityRestaurants;
  },
  SET_FOOD_TYPES(state, { foodTypes }) {
    state.foodTypes = foodTypes;
  },
  SET_FOOD_TYPES_BY_AREA(state, { foodTypes }) {
    const result = foodTypes.map(foodType => ({
      ...foodType,
      selected: false,
    }));
    state.foodTypesByArea = result;
  },
  SET_AREA_RESTAURANTS(state, { areaRestaurants }) {
    state.areaRestaurants = areaRestaurants;
  },
  SET_FILTERED_AREA_RESTAURANTS(state, { filteredAreaRestaurants }) {
    state.filteredAreaRestaurants = filteredAreaRestaurants;
  },
  TOGGLE_FOOD_TYPES_SELECTION(state, selectedFoodTypes){
    const foodTypes = state.foodTypesByArea.map(foodType => ({
      ...foodType,
      selected: selectedFoodTypes.includes(foodType.slug)
    }));
    state.foodTypesByArea = foodTypes;
  }
};

export default mutations;