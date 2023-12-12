const { User } = require('../models');

const findAll = async () => {
  return User.find();
};

const findById = async (id) => {
  return User.findOne({ _id: id });
};

const create = async (user) => {
  return User.create(user);
};

const updateById = async (id, user) => {
  return User.findByIdAndUpdate(id, user, { new: true });
};

const getUserOrders = async (userId) => {
  const user = await User.findById(userId);
  return user.orders;
};

const addOrder = async (userId, order) => {
  const user = await User.findById(userId);
  user.orders.push(order);
  await user.save();
};

const updateFav = async (userId, fav) => {
  const user = await User.findById(userId);
  user.fav = fav;
  await user.save();
};

const updateMyCart = async (userId, myCart) => {
  const user = await User.findById(userId);
  user.myCart = myCart;
  await user.save();
};

module.exports = {
  findById,
  findAll,
  create,
  updateById,
  getUserOrders,
  addOrder,
  updateFav,
  updateMyCart,
};
