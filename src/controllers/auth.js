const { auth } = require('../services');
const apiResponse = require('../utils/apiResponse');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return apiResponse.error(
        new Error("Email or password can't be empty"),
        401
      )(req, res, next);
    }

    const response = await auth.login({ email, password });
    if (!response.status) {
      return apiResponse.error(new Error(response.message), 401)(
        req,
        res,
        next
      );
    }
    return apiResponse.success(response)(req, res, next);
  }
  catch (err) {
    return apiResponse.error(err, 500)(req, res, next);
  }
};

const loginSocial = async (req, res, next) => {
  try {
    const { provider, token } = req.body;

    if (!provider || !token) {
      return apiResponse.error(new Error('Provider or token is missing'), 400)(
        req,
        res,
        next
      );
    }
    const socialUser = await auth.socialLogin(provider, token);
    const existingUser = await User.findOne({ email: socialUser.email });
    if (existingUser) {
      existingUser.socialLogins[provider] = token;
      await existingUser.save();
      const response = await auth.login({
        email: existingUser.email,
      });
      return apiResponse.success(response)(req, res, next);
    }

    const newUser = await User.create({
      email: socialUser.email,
      socialLogins: {
        [provider]: token,
      },
    });
    const response = await auth.login({ email: newUser.email });
    return apiResponse.success(response)(req, res, next);
  }
  catch (err) {
    return apiResponse.error(err, 500)(req, res, next);
  }
};

const registration = async (req, res, next) => {
  try {
    const response = await auth.registration(req.body);
    return apiResponse.success(response, 201)(req, res, next);
  }
  catch (err) {
    return apiResponse.error(err, 500)(req, res, next);
  }
};

const forgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return apiResponse.error(new Error("Email can't be empty"), 401)(
        req,
        res,
        next
      );
    }
    const response = await auth.forgetPassword(req.body);

    return apiResponse.success(response, 200)(req, res, next);
  }
  catch (err) {
    return apiResponse.error(err, 500)(req, res, next);
  }
};

const forgetPasswordReset = async (req, res, next) => {
  try {
    const { code, password } = req.body;

    if (!code || !password) {
      return apiResponse.error(
        new Error("Code or Password can't be empty"),
        401
      )(req, res, next);
    }

    const response = await auth.forgetPasswordReset(req.body);
    return apiResponse.success(response, 200)(req, res, next);
  }
  catch (err) {
    return apiResponse.error(err, 500)(req, res, next);
  }
};

module.exports = {
  login,
  loginSocial,
  registration,
  forgetPassword,
  forgetPasswordReset,
};
