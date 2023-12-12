const jwt = require('jsonwebtoken');
const { User } = require('../models');
const secret = 'mysecretkey';
const generateToken = async (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    name: user.name,
  };
  const token = jwt.sign(payload, secret);
  return token;
};

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return ApiResponse.error(
        new Error('Access denied. No token provided.'),
        401
      );
    }

    const tokens = token.split(' ');
    const user = decodeToken(tokens[tokens.length - 1]);
    if (user) {
      const isExist = await User.findOne({
        _id: user._id,
        email: user.email,
      });

      if (!isExist) {
        return ApiResponse.error(
          new Error('Access denied. user not valid'),
          401
        );
      }

      req.user = isExist;
      next();
    }
  } catch (error) {
    console.error(error);
    return ApiResponse.error(new Error('Invalid token provided.'), 401);
  }
};

const decodeToken = (token) => {
  try {
    if (!token) {
      return;
    }
    return jwt.verify(token, secret);
  } catch (e) {
    console.error(e);
    return '';
  }
};

module.exports = {
  generateToken,
  validateToken,
  decodeToken,
};
