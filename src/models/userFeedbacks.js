const mongoose = require('mongoose');

const UsersFeedback = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'orders'
  },
  truckId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'trucks'
  },
  rating: {
    type: String,
  },
  feedback: {
    type: String, required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('user_feedbacks', UsersFeedback);
