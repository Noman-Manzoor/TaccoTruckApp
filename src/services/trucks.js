const { Truck } = require('../models');
exports.getAll = async () => {
  return Truck.find();
}
exports.getReviews = async (id) => {
  return Truck.findById(id).populate("feedbacks")
}
exports.getById = async (id) => {
  return Truck.findById(id);
}
exports.getTruckMenu = async () => {
  return Truck.findById(id).populate("menu")
}
exports.getTruckOrders = async (id) => {
  return Truck.findById(id).populate("orders.accepted");
}
exports.getTruckOrderRequest = async (id) => {
  return Truck.findById(id).populate("orders.requested");
}
exports.updateTruckOrderRequest = async (id, orderId, data) => {
  return Truck.updateOne({ _id: id, "orders.requested._id": orderId }, {
    $set: {
      "orders.requested.$[i]": {
        ...data,
      }
    }, arrayFilters: [{ "orders.requested._id": orderId }],
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