const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

const authorizeAdmin = (req, res, next) => {
  if (!req.user.is_admin) {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

module.exports = { authenticate, authorizeAdmin };
