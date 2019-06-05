
const Area = require('./area.model');

function get(req, res) {
  const { areaId } = req.params;
  Area.get(areaId)
    .then(restaurants => res.json(restaurants));
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
