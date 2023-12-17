const { trucks } = require('../controllers');
const { validateToken } = require('../middleware/validate');
const Router = require('express').Router();

Router.get('/', validateToken, trucks.getAll);
Router.get('/category', validateToken, trucks.getCategory);
Router.get('/reviews', validateToken, trucks.getReviews);
Router.get('/me', validateToken, trucks.getById);
Router.get('/menu', validateToken, trucks.getTruckMenu);
Router.get('/orders', validateToken, trucks.getTruckOrders);
Router.get('/orders/requests', validateToken, trucks.getTruckOrderRequest);
Router.get('/:id', validateToken, trucks.getById);
Router.post('/orders/request/:orderId', validateToken, trucks.updateTruckOrderRequest);
Router.post('/menu', validateToken, trucks.addTruckMenu);
Router.put('/menu/:menuId', validateToken, trucks.updateTruckMenu);
Router.put('/me', validateToken, trucks.updateTruckMenu);
Router.put('/:id', validateToken, trucks.updateTruckMenu);
Router.delete('/menu/:menuId', validateToken, trucks.deleteTruckMenu);

module.exports = Router;
