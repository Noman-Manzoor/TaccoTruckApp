const mongoose = require('mongoose');

const UserOrders = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, ref: 'users'
    },
    truckId: {
      type: mongoose.Schema.Types.ObjectId, ref: 'trucks'
    },
    status: {
      type: String,
    },
    price: {
      type: Number,
    },
    deliveryFee: {
      type: Number,
    },
    serviceType: {
      type: String,
      required: true,
      enum: ['delivery', 'pickup']
    },
    totalGst: {
      type: Number,
    },
    items: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('orders', UserOrders);
