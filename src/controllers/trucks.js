const { trucks } = require('../services');
const { success, error } = require('../utils/apiResponse');
const { haversineDistance } = require('../utils/location');
exports.getAll = async (req, res, next) => {
  try {
    const { latitude, longitude } = req.query;
    let where = {};
    if (latitude && longitude) where = {
      location: { $exists: true }
    }
    let response = await trucks.getAll(where);
    if (latitude && longitude) response = response.map((truck) => ({
      _id: truck._id,
      name: truck.name,
      thumbnails: truck.thumbnails,
      city: truck.city,
      startTime: truck.city,
      endTime: truck.endTime,
      rating: truck.rating,
      description: truck.description,
      photos: truck.photos,
      location: truck.location,
      away: haversineDistance(latitude, longitude, truck.location.latitude, truck.location.longitude)
    })).sort((truck1, truck2) => truck1.away - truck2.away)
    success(response)(req, res, next)
  }
  catch (e) {
    error(new Error(e["message"] || "Internal server error"), 500)(req, res, next)
  }
}

exports.getReviews = async (req, res, next) => {
  try {
    const response = await trucks.getReviews(req.user.id);
    success(response)(req, res, next)
  }
  catch (e) {
    error(new Error(e["message"] || "Internal server error"), 500)(req, res, next)
  }
}
exports.getCategory = async (req, res, next) => {
  try {
    const response = await trucks.getCategory(req.user.id);
    success(response)(req, res, next)
  }
  catch (e) {
    error(new Error(e["message"] || "Internal server error"), 500)(req, res, next)
  }
}


exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await trucks.getById(id || req.user.id);
    if (!response) {
      return error(new Error("Truck not found"), 500)(req, res, next)
    }
    return success(response)(req, res, next)
  }
  catch (e) {
    return error(new Error(e["message"] || "Internal server error"), 500)(req, res, next)
  }
}
exports.getTruckMenu = async (req, res, next) => {
  try {
    const response = await trucks.getTruckMenu();
    if (!response) {
      return error(new Error("Truck not found"), 500)(req, res, next)
    }
    success(response)(req, res, next)
  }
  catch (e) {
    error(new Error(e["message"] || "Internal server error"), 500)(req, res, next)
  }
}

exports.getTruckOrders = async (req, res, next) => {
  try {
    const { id } = req.params
    const response = await trucks.getTruckOrders(id || req.user.id);
    if (!response) {
      return error(new Error("Truck not found"), 500)(req, res, next)
    }
    success(response)(req, res, next)
  }
  catch (e) {
    error(new Error(e["message"] || "Internal server error"), 500)(req, res, next)
  }
}
exports.getTruckOrderRequest = async (req, res, next) => {
  try {
    const { id } = req.params
    const response = await trucks.getTruckOrderRequest(id);
    success(response)(req, res, next)
  }
  catch (e) {
    error(new Error(e["message"] || "Internal server error"), 500)(req, res, next)
  }
}
exports.updateTruckOrderRequest = async (req, res, next) => {
  try {
    const { orderId } = req.params
    if (!req.body.hasOwnProperty("status")) {
      return error(new Error("Status is required"), 400)(req, res, next)
    }
    const response = await trucks.updateTruckOrderRequest(req.user["id"], orderId, req.body);
    success(response)(req, res, next)
  }
  catch (e) {
    error(new Error(e["message"] || "Internal server error"), 500)(req, res, next)
  }
}
exports.addTruckMenu = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await trucks.addTruckMenu(id, req.body);
    success(response)(req, res, next)
  }
  catch (e) {
    error(new Error(e["message"] || "Internal server error"), 500)(req, res, next)
  }
}
exports.updateTruckMenu = async (req, res, next) => {
  try {
    const { id } = req.params
    const response = await trucks.updateTruckMenu();
    success(response)(req, res, next)
  }
  catch (e) {
    error(new Error(e["message"] || "Internal server error"), 500)(req, res, next)
  }
}
exports.updateTruck = async (req, res, next) => {
  try {
    const response = await trucks.updateTruck(req.params.id || req.user.id);
    success(response)(req, res, next)
  }
  catch (e) {
    error(new Error(e["message"] || "Internal server error"), 500)(req, res, next)
  }
}
exports.deleteTruckMenu = async (req, res, next) => {
  try {
    const { id } = req.params
    const response = await trucks.deleteTruckMenu(id);
    success(response)(req, res, next)
  }
  catch (e) {
    error(new Error(e["message"] || "Internal server error"), 500)(req, res, next)
  }
}