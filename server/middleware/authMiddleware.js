const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];
    if (!token)
        return res.status(401).json({
            success: false,
            message: "Access token not found",
        });

    try {
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        req.username = decode.username;
        next();
    } catch (error) {
        res.status(403).json({
            success: false,
            message: "Invalid token",
        });
    }
}

module.exports = authMiddleware;
