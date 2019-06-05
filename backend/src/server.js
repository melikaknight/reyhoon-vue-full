const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const httpStatus = require('http-status');
const cors = require('cors');
const routes = require('./routes');
const config = require('./config');
const APIError = require('./helpers/APIError');

const app = express();

if (config.env === 'development') {
  app.use(logger('dev'));
}

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(compress());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// mount all routes on /api path
app.use('/api', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new APIError('API Not Found', httpStatus.NOT_FOUND, true);
  return next(err);
});

// error handler, send stacktrace only during development
app.use((err, req, res, next) => // eslint-disable-line no-unused-vars
  res.status(err.status).json({ // eslint-disable-line implicit-arrow-linebreak
    message: err.isPublic ? err.message : httpStatus[err.status],
    stack: config.env === 'development' ? err.stack : {},
  }));

module.exports = app;
