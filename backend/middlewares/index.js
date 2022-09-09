const jwt = require("jsonwebtoken");
const { sendAuthorizationError } = require("../util/error");
const { TOKEN_SECRET } = require('../config')[process.env.ENV || 'dev'];

module.exports.authorizationMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) return sendAuthorizationError(res);

    jwt.verify(token, TOKEN_SECRET, (err, decoded) => {
        if (err) return sendAuthorizationError(res);

        if (!req.body) req.body = {};
        req.body.user = decoded.token;

        next();
    });
}
