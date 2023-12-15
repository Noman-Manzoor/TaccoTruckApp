const { users } = require('../controllers');
const { validateToken } = require('../middleware/validate');

const Router = require('express').Router();

Router.get('/', validateToken, users.findAll);
Router.get('/me', validateToken, users.findById);
Router.get('/orders', validateToken, users.getUserOrders);
Router.post('/orders', validateToken, users.updateMyCart);
Router.post('/truck/fav', validateToken, users.addTruckFav);
Router.put('/me', validateToken, users.update);
Router.delete('/truck/fav/:id', validateToken, users.removeTruckFav);

module.exports = Router;
