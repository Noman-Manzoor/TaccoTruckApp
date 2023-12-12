require('dotenv').config();

module.exports = {
  port: process.env.PORT,
  mongoDB: {
    hostname: process.env.MONGODB_HOSTNAME,
    port: process.env.MONGODB_PORT,
    database: process.env.MONGODB_DB,
  },
};
