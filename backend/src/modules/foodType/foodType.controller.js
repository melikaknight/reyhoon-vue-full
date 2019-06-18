// importing our Restaurnat model
const FoodType = require('./foodType.model');
// importing our filter functions
const Filter = require('./foodType.filters');

function list(req, res, next) {
  const {
    featured,
    citySlug,
    areaSlug,
    countsOnly,
  } = req.query;

  FoodType.list().then(
    async (foodTypes) => {
      const result = await Filter.filterFoodTypes(
        foodTypes, {
          featured,
          citySlug,
          areaSlug,
          countsOnly,
          // eslint-disable-next-line function-paren-newline
        });
      return res.json(result);
    }
  ).catch(e => next(e));
}

module.exports = {
  list,
};
