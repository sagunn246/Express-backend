const jwt = require('jsonwebtoken')

const jwtAuthMiddleware = (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth) res.status(401).json({
        message: "Unauthorized"
    })

    try {
        const decoded = jwt.verify(token, "hello");
        req.user = decoded;
        next();

    } catch (error) {
        res.status(401).json({ message: "Invalid Token" });
    }
}

const generateJWTToken = (userDetail) => {
    return jwt.sign(userDetail, "hello");
}

