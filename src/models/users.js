const mongoose = require('mongoose');
const { Schema } = mongoose;
const { hashPassword } = require('../utils/password');

const Users = new mongoose.Schema({
  email: {
    type: String, unique: true, validate: {
      validator: (value) => {
        return /\S+@\S+\.\S+/.test(value);
      }, message: 'Invalid email address',
    },
  }, password: {
    type: String,
  }, avatar: {
    type: String,
  }, firstName: {
    type: String,
  }, lastName: {
    type: String,
  }, contactNo: {
    type: String,
  }, address: {
    type: String,
  }, currentLoc: {
    type: Object,
  }, medium: {
    type: String, enum: ["email", "google", "facebook"], default: "email"
  }, orders: {
    type: [{
      type: mongoose.Schema.Types.ObjectId, ref: "orders"
    }],
  }, fav: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'trucks' }]
  }, myCart: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "orders" }],
  }, extraPayload: {
    type: Object,
  },
}, {
  timestamps: true,
});

Users.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password') || user.isNew) {
    try {
      const hash = await hashPassword(user.password);
      user.password = hash;
    }
    catch (err) {
      return next(err);
    }
  }

  return next();
});

Users.index({ email: 1, });

module.exports = mongoose.model('users', Users);
