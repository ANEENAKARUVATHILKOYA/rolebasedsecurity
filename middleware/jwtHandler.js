const { verifyToken } = require("../utils/jwthelper");

const jwtHandler = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Authorization token is required"
        });
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(401).json({
            message: "Invalid authorization format"
        });
    }

    const token = parts[1];

    const result = verifyToken(token);

    if (!result.valid) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }

    req.userid = result.userid;
    req.roles = result.roles;

    next();
};

module.exports = jwtHandler;