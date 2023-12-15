const { User, Truck } = require('../models');
const { matchPassword } = require('../utils/password');
const { generateToken } = require('../middleware/validate');

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  const trucks = await Truck.findOne({ "driver.email": email })
  if (!user && !trucks) {
    throw new Error('User not found');
  }
  if (user) {
    const isValidPassword = matchPassword(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid password');
    }
    delete user["password"];

    return {
      accessToken: await generateToken({ ...user._doc, userType: "user" }), user: user
    };
  }
  else {
    const isValidPassword = matchPassword(password, trucks.driver.password);
    if (!isValidPassword) {
      throw new Error('Invalid password');
    }
    delete trucks["driver"]["password"];

    return {
      accessToken: await generateToken({ ...trucks._doc.driver, _id: trucks._id, userType: "driver" }), user: trucks
    };
  }
};
const loginSocial = async ({ email, token, provider, ...rest }) => {
  const user = await User.findOne({ email });
  const trucks = await Truck.findOne({ "driver.email": email })
  if (!user && !trucks) {
    return await User.create({
      email, medium: provider, password: rest.uid, extraPayload: {
        token, uid: rest.uid
      }, ...rest
    });
  }
  return user || trucks;
};

const registration = async (data) => {
  if (data["userType"] === "user") {
    const trucks = await Truck.findOne({ "driver.email": data.email })
    if (trucks) {
      throw Error("Already an user associated with this email")
    }
    const user = new User({ ...data });
    await user.save();
    return user;
  }
  else {
    const user = await User.findOne({ "email": data.email })
    if (user) {
      throw Error("Already an user associated with this email")
    }
    const truck = new Truck({ driver: data });
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
