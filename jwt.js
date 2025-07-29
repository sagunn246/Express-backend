const jwt = require("jsonwebtoken");
const jwtAuthMiddleware = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const token = auth.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized: Token not found",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.secret_key);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

const generateJWTToken = (userDetail) => {
  return jwt.sign(userDetail, process.env.secret_key);
};

module.exports = { jwtAuthMiddleware, generateJWTToken };
