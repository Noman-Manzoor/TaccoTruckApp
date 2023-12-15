const jwt = require('jsonwebtoken');
const { User, Truck } = require('../models');
const { error } = require('../utils/apiResponse');
const secret = 'mysecretkey';
const generateToken = async (user) => {
  console.log(user)
  const payload = {
    id: user._id,
    email: user.email,
    name: user.name,
    userType: user.userType
  };
  const token = jwt.sign(payload, secret);
  return token;
};

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return error(
        new Error('Access denied. No token provided.'),
        401
      )(req, res, next);
    }

    const tokens = token.split(' ');
    const user = decodeToken(tokens[tokens.length - 1]);
    console.log(user)
    if (user) {
      let isExist;
      if (user.userType === "user") {
        isExist = await User.findOne({
          _id: user.id,
        });
      }
      else {
        isExist = await Truck.findOne({
          _id: user.id,
        });
      }

      if (!isExist) {
        return error(
          new Error('Access denied. user not valid'),
          401
        )(req, res, next);
      }
      req.user = user;
      req[user.userType] = isExist
      next();
    }
  }
  catch (error) {
    console.error(error);
    return error(new Error('Invalid token provided.'), 401)(req, res, next);
  }
};

const decodeToken = (token) => {
  try {
    if (!token) {
      return;
    }
    return jwt.verify(token, secret);
  }
  catch (e) {
    console.error(e);
    return '';
  }
};

module.exports = {
  generateToken,
  validateToken,
  decodeToken,
};
