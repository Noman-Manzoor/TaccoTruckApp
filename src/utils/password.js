const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

const matchPassword = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};

const generatePassword = (length) => {
  const chars =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const password = new Array(length)
    .fill(null)
    .map(() => chars[Math.floor(Math.random() * chars.length)])
    .join('');
  return password;
};

function generatePIN() {
  var pin = Math.floor(Math.random() * 10000);
  pin = pin.toString().padStart(4, '0');
  return pin;
}

module.exports = {
  hashPassword,
  matchPassword,
  generatePassword,
  generatePIN,
};
