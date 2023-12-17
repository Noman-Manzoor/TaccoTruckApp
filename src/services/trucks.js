const { Truck, Feedback, Order } = require('../models');
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
  return Truck.findById(id);
}
exports.getTruckMenu = async (id) => {
  return Truck.findById(id).populate("menu")
}
exports.getTruckOrders = async (id) => {
  return Order.find({
    truckId: id,

  }).populate("users");
}
exports.getTruckOrderRequest = async (id) => {
  return Order.find({
    status: 1, truckId: id
  });
}

exports.updateTruckOrderRequest = async (id, orderId, data) => {
  return Order.updateOne({ _id: orderId, truckId: id }, {
    status: data.status,
  })
}

exports.updateTruck = async (id, data) => {
  return Truck.updateOne({ _id: id }, {
    ...data
  })
}


exports.addTruckMenu = async (id, data) => {
  return Truck.updateOne({
    _id: id
  }, {
    $addToSet: {
      "menu": data
    }
  })

}
exports.updateTruckMenu = async (id, menuId, data) => {
  return Truck.updateOne({ _id: id, "menu._id": menuId }, {
    $set: {
      "menu.$[i]": {
        ...data,
      }
    }, arrayFilters: [{ "menu._id": menuId }],
  })
}

exports.deleteTruckMenu = async (id, menuId) => {
  return Truck.updateOne({ _id: id }, {
    $pull: {
      menu: { _id: menuId },
    },
  })
}