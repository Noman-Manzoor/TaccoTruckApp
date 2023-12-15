const { users } = require('../services');
const { success, error } = require('../utils/apiResponse');

const findAll = async (req, res, next) => {
  try {
    const response = await users.findAll();
    success(response)(req, res, next);
  }
  catch (e) {
    error(new Error(e.message))(req, res, next);
  }
};

const findById = async (req, res, next) => {
  const id = req.user.id;
  try {
    const user = await users.findById(id);
    success(user)(req, res, next);
  }
  catch (e) {
    error(new Error(e.message))(req, res, next);
  }
};

const getUserOrders = async (req, res, next) => {
  const userId = req.user.id;
  try {
    const orders = await users.getUserOrders(userId);
    success(orders || [])(req, res, next);
  }
  catch (e) {
    error(new Error(e.message))(req, res, next);
  }
};

const addOrder = async (req, res, next) => {
  try {
    const orders = await users.addOrder(req.user.id, req.body);
    success({ message: "Successfully added the order in cart" })(req, res, next);
  }
  catch (e) {
    error(new Error(e.message))(req, res, next);
  }
};

const updateMyCart = async (req, res, next) => {
  try {
    const orders = await users.updateMyCart(req.user.id, req.body);
    success({ message: "Successfully submit order" })(req, res, next);
  }
  catch (e) {
    error(new Error(e.message))(req, res, next);
  }
};
const addTruckFav = async (req, res, next) => {
  try {
    const orders = await users.addTruckFav(req.user.id, req.body);
    success({ message: "Successfully Added" })(req, res, next);
  }
  catch (e) {
    error(new Error(e.message))(req, res, next);
  }
};

const removeTruckFav = async (req, res, next) => {
  try {
    const orders = await users.removeTruckFav(req.user.id, req.body);
    success({ message: "Successfully remove" })(req, res, next);
  }
  catch (e) {
    error(new Error(e.message))(req, res, next);
  }
};

const update = async (req, res, next) => {
  const userId = req.user.id;
  const updates = req.body;
  try {
    const updatedUser = await users.updateById(userId, updates);
    success({ message: "Successfully updated user details" })(req, res, next);
  }
  catch (e) {
    error(new Error(e.message))(req, res, next);
  }
};

module.exports = {
  findAll, findById, getUserOrders, addOrder, updateMyCart, update, addTruckFav, removeTruckFav
};
