// routes/pricing.js
const express = require("express");
const pricingController = require("../controllers/pricingController");
const { authenticate, authorizeAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authenticate);
router.use(authorizeAdmin);

// GET /api/pricing -> Retrieve all pricing records
router.get("/", pricingController.getAllPricing);

// POST /api/pricing -> Create a new pricing record (will fail if there are already 2)
router.post("/", pricingController.createPricing);

// PUT /api/pricing/:id -> Update pricing details (plan name and price)
router.put("/:id", pricingController.updatePricing);

module.exports = router;
