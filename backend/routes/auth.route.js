const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/auth.controller');

authRouter.post('/login', authController.login);
authRouter.post('/signup', authController.signup);

module.exports.authRouter = authRouter;