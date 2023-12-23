const mongoose = require('mongoose');
const {hashPassword} = require('../utils/password');
const {Schema} = mongoose;

const Trucks = new mongoose.Schema(
  {
    driver: {
      email: {
        type: String,
        unique: true,
        validate: {
          validator: (value) => {
            return /\S+@\S+\.\S+/.test(value);
          }, message: 'Invalid email address',
        },
      },
      password: {
        type: String,
      },
      avatar: {
        type: String,
      },
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      contactNo: {
        type: String,
      },
      address: {
        type: String,
      },
      currentLoc: {
        type: Object,
      },
      medium: {
        type: String,
        enum: ["email", "google", "facebook"],
        default: "email"
      },
    },
    name: {
      type: String,
    },
    thumbnails: {
      type: String,
    },
    category: {
      type: String,
    },
    startTime: {
      type: String,
    },
    endTime: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0.0
    },
    description: {
      type: String,
    },
    photos: {
      type: Array,
    },
    menu: [
      {
        _id: {
          type: Schema.Types.ObjectId,
          default: mongoose.Types.ObjectId,
          auto: true
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
      latitude: {
        type: Number
      },
      longitude: {
        type: Number
      },
      other: {
        type: Object
      }
    },
    extraPayload: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);


Trucks.pre('save', async function (next) {
  const truck = this;
  if (truck.isModified('password') || truck.isNew) {
    try {
      const hash = await hashPassword(truck.driver.password);
      truck.driver.password = hash;
    } catch (err) {
      return next(err);
    }
  }
  
  return next();
});

Trucks.index({"driver.email": 1,});

module.exports = mongoose.model('trucks', Trucks);
