const Promise = require('bluebird');
const User = require('./user.model');
const usersData = require('./users.json');

const userSeeder = async () => {
  const newUsers = usersData.map((user) => {
    const newUser = new User(user);
    return newUser.save();
  });
  return Promise.all(newUsers);
};

module.exports = userSeeder;
