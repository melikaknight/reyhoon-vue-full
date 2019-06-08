
const City = require('./city.model');

function get(req, res) {
  const { citySlug } = req.params;
  City.getBySlug(citySlug)
    .then(areas => res.json(areas));
}

function list(req, res, next) {
  City.list()
    .then(cities => res.json(cities))
    .catch(e => next(e));
}

module.exports = {
  get,
  list,
};
