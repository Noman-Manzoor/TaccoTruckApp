const mongoose = require('mongoose');
const { Schema } = mongoose;
const { hashPassword } = require('../utils/password');

const Users = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value) => {
          return /\S+@\S+\.\S+/.test(value);
        },
        message: 'Invalid email address',
      },
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    contactNo: {
      type: String,
    },
    address: {
      type: String,
    },
    medium: {
      type: String,
    },
    orders: {
      type: Array,
    },
    fav: {
      type: Object,
    },
    myCart: {
      type: Array,
    },
    extraPayload: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

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

Users.index({ email: 1, userName: 1 });

module.exports = mongoose.model('Users', Users);
