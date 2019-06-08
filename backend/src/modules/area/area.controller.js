
const Area = require('./area.model');

function get(req, res) {
  const { areaSlug } = req.params;
  Area.getBySlug(areaSlug).then(
    restaurants => res.json(restaurants)
  );
}

function list(req, res, next) {
  Area.list()
    .then(areas => res.json(areas))
    .catch(e => next(e));
}

module.exports = {
  get,
  list,
};
