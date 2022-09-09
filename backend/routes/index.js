const express = require('express');
const router = express.Router();
const { authorizationMiddleware } = require('../middlewares');

const { authRouter } = require('./auth.route');
const { userRouter } = require('./user.route');

router.use('/auth', authRouter);

// authorization middlewares
router.use(authorizationMiddleware);
router.use('/user', userRouter);

module.exports = router;
