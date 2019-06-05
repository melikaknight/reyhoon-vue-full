const mongoose = require('mongoose');
const debug = require('debug')('node-server:index');
const Promise = require('bluebird');

const isCollectionEmpty = async (collectionName) => {
  // To Count Documents of a particular collection
  // returns true if the collection is empty
  try {
    const collectionhandler = await mongoose.connection.collection(collectionName);

    const result = await collectionhandler.countDocuments().then((count) => {
      if (count === 0) {
        debug(`${collectionName} collection is empty.`);
        return Promise.resolve(true);
      }
      debug(`${collectionName} Records Count: ${count}`);
      return Promise.resolve(false);
    });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = isCollectionEmpty;
