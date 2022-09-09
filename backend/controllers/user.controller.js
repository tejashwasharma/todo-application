const userService = require('../services/user.service');
const { sendErrorResponse } = require('../util/error');

module.exports.getUserboard = (req, res) => {
    userService.getUserboard(req.body.user)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            console.log(err);
            sendErrorResponse(res, err);
        })
}

module.exports.createBoardItem = (req, res) => {
    userService.createBoardItem(req.body)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            console.log(err);
            sendErrorResponse(res, err);
        })
}

module.exports.updateBoardItem = (req, res) => {
    userService.updateBoardItem(req.body)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            console.log(err);
            sendErrorResponse(res, err);
        })
}
