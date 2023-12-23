const {users} = require('../controllers');
const {validateToken} = require('../middleware/validate');

const Router = require('express').Router();

Router.get('/', validateToken, users.findAll);
Router.get('/me', validateToken, users.findById);
Router.get('/truck/fav', validateToken, users.getFavTruck);
Router.get('/orders', validateToken, users.getUserOrders);
Router.post('/orders', validateToken, users.updateMyCart);
Router.post('/checkout', validateToken, users.orderCheckOut);
Router.post('/truck/fav', validateToken, users.addTruckFav);
Router.put('/me', validateToken, users.update);
Router.delete('/truck/fav/:id', validateToken, users.removeTruckFav);

module.exports = Router;
