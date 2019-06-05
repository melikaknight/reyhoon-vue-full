const Promise = require('bluebird');
const areasData = require('./areas.json');
const Area = require('./area.model');
const City = require('../city/city.model');

const areaSeeder = async () => {
  const cities = await City.list();

  const newAreas = areasData.map(({ area, slug, city }) => {
    const result = cities.filter(ct => ct.city === city);
    if (result) {
      const { _id: cityId } = result[0];
      const newArea = new Area({
        area,
        slug,
        city: cityId,
      });
      return City.registerArea(newArea).then(() => newArea.save());
    }
    return null;
  });
  return Promise.all(newAreas);
};

module.exports = areaSeeder;
