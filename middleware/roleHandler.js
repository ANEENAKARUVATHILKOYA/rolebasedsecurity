const roleHandler = (requiredRole) => {

    return (req, res, next) => {

        if (req.role !== requiredRole) {

            return res.status(403).json({
                message: "Access denied. Admin role required."
            });

        }

        next();

    };

};

module.exports = roleHandler;