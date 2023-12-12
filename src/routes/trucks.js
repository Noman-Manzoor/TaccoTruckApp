const { trucks } = require('../controllers');
const { validateToken } = require('../middleware/validate');
const Router = require('express').Router();

Router.get('/', validateToken, trucks.getAll);
Router.get('/reviews', validateToken, trucks.getReviews);
Router.get('/:id', validateToken, trucks.getById);
Router.get('/menu', validateToken, trucks.getTruckMenu);
Router.get('/orders', validateToken, trucks.getTruckOrders);
Router.get('/orders/requests', validateToken, trucks.getTruckOrderRequest);
Router.post('/orders/request/:orderId', validateToken, trucks.updateTruckOrderRequest);
Router.post('/menu', validateToken, trucks.addTruckMenu);
Router.put('/menu/:menuId', validateToken, trucks.updateTruckMenu);
Router.delete('/menu/:menuId', validateToken, trucks.deleteTruckMenu);

module.exports = Router;
