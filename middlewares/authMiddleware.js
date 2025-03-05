const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res
      .status(401)
      .json({ message: "Token must be in 'Bearer <token>' format" });
  }

  const token = parts[1];
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    const message =
      error.name === "TokenExpiredError"
        ? "Token has expired"
        : "Invalid token";
    res.status(401).json({ message, error: error.message });
  }
};

const authorizeAdmin = (req, res, next) => {
  if (!req.user || !req.user.is_admin) {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};

module.exports = { authenticate, authorizeAdmin };
