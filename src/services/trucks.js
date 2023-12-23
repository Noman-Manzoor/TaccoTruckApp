const {Truck, Feedback, Order} = require('../models');
const {Types} = require("mongoose");
exports.getAll = async (where = {}) => {
  return Truck.find(where);
}
exports.getReviews = async (id) => {
  return Feedback.find({
    truckId: id
  }).populate("users")
}
exports.getCategory = async (id) => {
  return Truck.distinct("category")
}
exports.getById = async (id) => {
  return Truck.aggregate([{
    $match: {
      _id: new Types.ObjectId(id)
    }
  }, {
    $lookup: {
      from: 'user_feedbacks', localField: '_id', foreignField: 'truckId', as: 'feedbacks',
    },
  },]);
}
exports.getTruckMenu = async (id) => {
  return Truck.findById(id, {menu: 1})
}
exports.getTruckOrders = async (id) => {
  return Order.find({
    truckId: new Types.ObjectId(id),
  }).populate("userId");
}
exports.getTruckOrderRequest = async (id) => {
  return Order.find({
    status: 1, truckId: id
  });
}

exports.updateTruckOrderRequest = async (id, orderId, data) => {
  return Order.updateOne({_id: orderId, truckId: id}, {
    status: data.status,
  })
}

exports.updateTruck = async (id, data) => {
  console.log(data)
  return Truck.updateOne({_id: id}, {
    ...data
  })
}


exports.addTruckMenu = async (id, data) => {
  return Truck.updateOne({
    _id: id
  }, {
    $addToSet: {
      "menu": {...data, _id: new Types.ObjectId()}
    }
  })
  
}
exports.updateTruckMenu = async (id, menuId, data) => {
  let truck = await Truck.findOne({
    _id: id
  }, {menu: 1});
  
  console.log("/////////// DATA ////////////", data)
  const findIndex = truck.menu.findIndex((i) => i._id.toString() === menuId)
  let menu = [...truck.menu]
  menu[findIndex] = {...data, _id: new Types.ObjectId(menuId)};
  return Truck.updateOne({_id: id}, {
    menu
  })
}

exports.deleteTruckMenu = async (id, menuId) => {
  return Truck.updateOne({_id: id}, {
    $pull: {
      menu: {_id: menuId},
    },
  })
}