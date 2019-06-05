const Promise = require('bluebird');
const cityData = require('./cities.json');
const City = require('./city.model');

const citySeeder = async () => {
  const newCitiesArr = cityData.map(({ city, slug }) => {
    const newCity = new City({
      city,
      slug,
    });
    return newCity.save();
  });
  return Promise.all(newCitiesArr);
};

module.exports = citySeeder;
