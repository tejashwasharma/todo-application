const authService = require('../services/auth.service');
const { sendErrorResponse, sendInvalidPasswordError, sendResourceNotFoundError, sendUserAlreadyExistsError } = require('../util/error');
const { FORBIDDEN, NOT_FOUND, UNPROCESSABLE_ENTITY } = require('../util/statusCode');

module.exports.login = (req, res) => {
    authService.login(req.body)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            console.log(err);
            if (err === FORBIDDEN) sendInvalidPasswordError(res);
            else if (err === NOT_FOUND) sendResourceNotFoundError(res);
            else sendErrorResponse(res, err);
        })
}

module.exports.signup = (req, res) => {
    authService.signup(req.body)
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            if (err === UNPROCESSABLE_ENTITY) sendUserAlreadyExistsError(res);
            else sendErrorResponse(res, err);
        })
}
