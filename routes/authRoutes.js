const express = require("express");
const authController = require("../controllers/authController");
const { authenticate } = require("../middlewares/authMiddleware");

const router = express.Router();

// Public routes
router.post("/signup", authController.signup);
router.post("/login", authController.login);

// Protected route (requires authentication)
router.use(authenticate);
router.post("/logout", authController.logout);

module.exports = router;
