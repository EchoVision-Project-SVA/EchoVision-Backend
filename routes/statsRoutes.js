// routes/stats.js
const express = require("express");
const router = express.Router();
const statsController = require("../controllers/statsController");
const { authenticate, authorizeAdmin } = require("../middlewares/authMiddleware");

router.use(authenticate);
router.use(authorizeAdmin);

router.get("/dashboard", statsController.getDashboardStats);

module.exports = router;
