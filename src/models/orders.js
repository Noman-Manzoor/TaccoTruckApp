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
      // pending(0), checkout(1), accept(2), reject(-1), processing(3), done(4)
      type: Number,
      required: true,
    },
    price: {
      type: Number,
    },
    deliveryFee: {
      type: Number,
    },
    deliveryAddress: {
      type: String,
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
