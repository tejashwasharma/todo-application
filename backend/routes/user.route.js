const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/user.controller');

userRouter.get('/board', userController.getUserboard);
userRouter.post('/board/item', userController.createBoardItem);
userRouter.put('/board/item', userController.updateBoardItem);

module.exports.userRouter = userRouter;