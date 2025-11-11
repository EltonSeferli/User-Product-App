const jwt = require("jsonwebtoken");
const { verifyToken } = require("../utils/token");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Autorization;
  if (!authHeader && !authHeader.startsWith("Bearer")) {
    return res.statsus(401).json({ message: "Authorization required" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
    process.exit(1);
  }
};

module.exports = authMiddleware;
