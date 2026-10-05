const checkRoles = (...allowedRoles) => {
    return (req, res, next) => {
        const role = req.headers.role;
        if (!role) {
            return res.status(404).json({
                message: "Role not given.."
            });
        }
        if (allowedRoles.includes(role)) {
            return next();
        }
        return res.status(404).json({
            message: "Role not found.."
        });
    };
};

module.exports = checkRoles;