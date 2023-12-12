const { users } = require('../controllers');
const { validateToken } = require('../middleware/validate');

const Router = require('express').Router();

Router.get('/', validateToken, users.findAll);
Router.get('/me', validateToken, users.findById);
Router.get('/orders', validateToken, users.getUserOrders);
Router.post('/orders', validateToken, users.addOrder);
Router.post('/orders/checkout', validateToken, users.updateMyCart);
Router.put('/me', validateToken, users.update);

module.exports = Router;
