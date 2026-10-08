const roleHandler = (requiredRoles) => {

    const allowedRoles = Array.isArray(requiredRoles)
        ? requiredRoles
        : [requiredRoles];

    return (req, res, next) => {

        const userRoles = Array.isArray(req.roles)
            ? req.roles
            : [req.roles];

        const hasRequiredRole = allowedRoles.some(role =>
            userRoles.includes(role)
        );

        if (!hasRequiredRole) {
            return res.status(403).json({
                message: "Access denied. Required role not found."
            });
        }

        next();
    };

};

module.exports = roleHandler;