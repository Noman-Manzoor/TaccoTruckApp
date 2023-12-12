const express = require('express');
const config = require('./config');
require('./src/models');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./src/routes');
const path = require('path');

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(
  cors({
    origin: '*',
    methods: '*',
  })
);

app.use("/store", express.static(path.join(__dirname, '/uploads')));

app.use('/api', routes);

app.listen(config.port, () => {
  console.log(`Server is working => ${ config.port }`);
});
