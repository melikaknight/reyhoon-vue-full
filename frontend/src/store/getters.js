const getters = {
  errorMessageGetter: (state) => (state.errorMessage),
  citiesGetter: (state) => (state.cities),
  cityBySlugGetter: (state) => (citySlug) => {
    return state.cities.find(
      city => city.slug === citySlug
    );
  },
};

export default getters;