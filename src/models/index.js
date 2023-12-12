const mongoose = require('mongoose');
const { mongoDB } = require('../../config');

mongoose
  .connect(
    `mongodb://${mongoDB.hostname}:${mongoDB.port}/${mongoDB.database}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .catch((error) => {
    console.log('Cannot Connect To Mongo Database!', error);
  });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
  console.log('Connected to MongoDB');
});

const User = require('./users');
const Truck = require('./trucks');

module.exports = {
  User,
  Truck,
};
