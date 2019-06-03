const mongoose = require('mongoose');
const util = require('util');
const debug = require('debug')('node-server:index');

// config should be imported before importing any other file
const config = require('./src/config');
const server = require('./src/server');

// make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign

// plugin bluebird promise in mongoose
mongoose.Promise = Promise;

// connect to mongo db
const mongoUri = config.mongo.host;
mongoose.connect(mongoUri, {
  useCreateIndex: true,
  useNewUrlParser: true,
  promiseLibrary: Promise,
});
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});

// db connection successful
mongoose.connection.on('open', () => {
  debug('db connected');
});

// print mongoose logs in dev env
if (config.mongooseDebug) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
}


// listen on port config.port
server.listen(config.port, () => {
  debug(`server started on port ${config.port} (${config.env})`);
});

module.exports = server;
