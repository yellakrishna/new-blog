const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.headers.token;
    if (!token) return res.status(401).json("Unauthorized, token missing");

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json("Token invalid");
        req.user = user;
        next();
    });
};
module.exports = verifyToken;