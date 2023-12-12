const mongoose = require('mongoose');
const { Schema } = mongoose;

const Trucks = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    thumbnails: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
    },
    description: {
      type: String,
    },
    photos: {
      type: Array,
    },
    feedbacks: [
      {
        _id: {
          type: Schema.Types.ObjectId,
          default: mongoose.Types.ObjectId,
        },
        user: {
          type: Object,
        },
        rating: {
          type: String,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    menu: [
      {
        _id: {
          type: Schema.Types.ObjectId,
          default: mongoose.Types.ObjectId,
        },
        img: {
          type: String,
        },
        title: {
          type: String,
        },
        category: {
          type: String,
        },
        price: {
          type: String,
        },
        quantity: {
          type: String,
        },
        noOfTimeOrdered: {
          type: Number,
          default: 0,
        },
      },
    ],
    location: {
      type: Object,
    },
    orders: {
      requested: {
        type: Array,
      },
      accepted: {
        type: Array,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Trucks', Trucks);
