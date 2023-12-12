const { trucks } = require('../services');
const { success, error } = require('../utils/apiResponse');
exports.getAll = async (req, res, next) => {
  try {
    const response = await trucks.getAll();
    success(response)(req, res, next)
  }
  catch (e) {
    error(new Error(e["message"] || "Internal server error"), 500)
  }
}

exports.getReviews = async (req, res, next) => {
  try {
    const response = await trucks.getReviews(req.user.id);
    success(response)(req, res, next)
  }
  catch (e) {
    error(new Error(e["message"] || "Internal server error"), 500)
  }
}


exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await trucks.getById(id);
    if (!response) {
      return error(new Error("Truck not found"));
    }
    return success(response)(req, res, next)
  }
  catch (e) {
    return error(new Error(e["message"] || "Internal server error"), 500)
  }
}
exports.getTruckMenu = async (req, res, next) => {
  try {
    const response = await trucks.getTruckMenu();
    success(response)(req, res, next)
  }
  catch (e) {
    error(new Error(e["message"] || "Internal server error"), 500)
  }
}
exports.getTruckOrders = async (req, res, next) => {
  try {
    const { id } = req.params
    const response = await trucks.getTruckOrders(id);
    success(response)(req, res, next)
  }
  catch (e) {
    error(new Error(e["message"] || "Internal server error"), 500)
  }
}
exports.getTruckOrderRequest = async (req, res, next) => {
  try {
    const { id } = req.params
    const response = await trucks.getTruckOrderRequest(id);
    success(response)(req, res, next)
  }
  catch (e) {
    error(new Error(e["message"] || "Internal server error"), 500)
  }
}
exports.updateTruckOrderRequest = async (req, res, next) => {
  try {
    const { orderId } = req.params
    const response = await trucks.updateTruckOrderRequest(req.user["_id"], orderId, req.body);
    success(response)(req, res, next)
  }
  catch (e) {
    error(new Error(e["message"] || "Internal server error"), 500)
  }
}
exports.addTruckMenu = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await trucks.addTruckMenu(id, req.body);
    success(response)(req, res, next)
  }
  catch (e) {
    error(new Error(e["message"] || "Internal server error"), 500)
  }
}
exports.updateTruckMenu = async (req, res, next) => {
  try {
    const { id } = req.params
    const response = await trucks.updateTruckMenu();
    success(response)(req, res, next)
  }
  catch (e) {
    error(new Error(e["message"] || "Internal server error"), 500)
  }
}
exports.deleteTruckMenu = async (req, res, next) => {
  try {
    const { id } = req.params
    const response = await trucks.deleteTruckMenu(id);
    success(response)(req, res, next)
  }
  catch (e) {
    error(new Error(e["message"] || "Internal server error"), 500)
  }
}