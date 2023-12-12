const { User, Truck } = require('../models');
const { matchPassword } = require('../utils/password');

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }

  const isValidPassword = await matchPassword(password, user.password);
  if (!isValidPassword) {
    throw new Error('Invalid password');
  }
  return user;
};
const loginSocial = async ({ email }) => {
  const user = await User.findOne({ email });
  if (!user) {
    return await User.create({ email });
  }
  return user;
};

const registration = async (data) => {
  if (data["userType"] === "user") {
    const user = new User({ ...data });
    await user.save();
    return user;
  }
  else {
    const truck = new Truck({ ...data });
    await truck.save();
    return truck;
  }
};
const forgetPassword = async ({ email }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }
  const resetToken = crypto.randomBytes(32).toString('hex');
  user.passwordResetToken = resetToken;
  user.passwordResetExpires = Date.now() + 1000 * 60 * 60; // 1 hour in milliseconds
  await user.save();
};

const forgetPasswordReset = async ({ email, token, password }) => {
  const user = await User.findOne({
    email, passwordResetToken: token, passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) {
    throw new Error('Invalid reset token');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  user.password = hashedPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  return user;
};

module.exports = {
  login, registration, loginSocial, forgetPassword, forgetPasswordReset,
};
