const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compress = require('compression');
const cors = require('cors');
const routes = require('./routes');
const config = require('./config');


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

module.exports = app;
