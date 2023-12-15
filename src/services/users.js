const { User, Order } = require('../models');

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
  const user = await Order.find({
    userId
  }).populate("trucks");
  return user.orders;
};

const addOrder = async (userId, order) => {
  return Order.create({ userId, order });
};

const addTruckFav = async (userId, fav) => {
  const user = await User.findById(userId);
  user.fav = fav;
  await user.save();
};
const removeTruckFav = async (userId, fav) => {
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
  findById, findAll, create, updateById, getUserOrders, addOrder, addTruckFav, removeTruckFav, updateMyCart,
};
