const {User, Order} = require('../models');
const {Types} = require("mongoose");

const findAll = async () => {
  return User.find();
};

const findById = async (id) => {
  return User.findOne({_id: id});
};
const getFavTruck = async (id) => {
  return User.findOne({_id: id}, {fav: 1}).populate("fav");
};

const create = async (user) => {
  return User.create(user);
};

const updateById = async (id, user) => {
  return User.findByIdAndUpdate(id, user, {new: true});
};

const getUserOrders = async (userId) => {
  const orders = await Order.find({
    userId: new Types.ObjectId(userId)
  }).populate("truckId");
  return orders;
};

const addOrder = async (userId, order) => {
  return Order.create({userId, order});
};

const addTruckFav = async (userId, fav) => {
  return User.updateOne(
    {_id: new Types.ObjectId(userId)},
    {$addToSet: {fav: new Types.ObjectId(fav.id)}}
  )
};
const removeTruckFav = async (userId, fav) => {
  const user = await User.findById(userId);
  user.fav = fav;
  await user.save();
};

const updateMyCart = async (userId, myCart) => {
  const isOrderExist = await Order.findOne({
    userId: new Types.ObjectId(userId),
    truckId: new Types.ObjectId(myCart.truckId),
    status: 0
  })
  if (isOrderExist) {
    await Order.updateOne({_id: isOrderExist._id}, myCart)
    return isOrderExist;
  } else {
    const order = await Order.create({...myCart, userId: new Types.ObjectId(userId)});
    const user = await User.findById(userId);
    user.myCart = order._id;
    await user.save();
    return order
  }
};
const orderCheckOut = async (userId, data) => {
  return Order.updateOne({_id: data._id}, {
    ...data,
    status: 1
  })
};

module.exports = {
  findById,
  findAll,
  create,
  updateById,
  getUserOrders,
  addOrder,
  addTruckFav,
  removeTruckFav,
  updateMyCart,
  orderCheckOut,
  getFavTruck
};
