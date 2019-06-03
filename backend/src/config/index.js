const dotenv = require('dotenv');

const envConfig = dotenv.config();
if (envConfig.error) {
  throw new Error(`Environment file config error: ${envConfig.error}`);
}

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongooseDebug: process.env.MONGOOSE_DEBUG,
  mongo: {
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
  },
};

module.exports = config;
