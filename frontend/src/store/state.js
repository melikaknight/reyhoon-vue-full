import httpClient from '@/services/httpClient';

const state = {
  appName: 'Reyhoon Vue',
  appAuthor: 'ملیکا عبدالهی',
  httpClient: httpClient(),
  errorMessage: "",
  cities: [],
  selectedCity: "tehran",
  cityRestaurants: [],
  areaRestaurants: [],
  filteredAreaRestaurants: [],
  foodTypes: [],
  foodTypesByArea: [],
};

export default state;