
const City = require('./city.model');

function get(req, res) {
  const { cityId } = req.params;
  City.get(cityId)
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
