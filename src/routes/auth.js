const { auth } = require('../controllers');

const Router = require('express').Router();

Router.post('/login', auth.login);
Router.post('/login/social', auth.loginSocial);
Router.post('/registration', auth.registration);
Router.post('/forget-password', auth.forgetPassword);
Router.post('/forget-password/reset', auth.forgetPasswordReset);

module.exports = Router;
