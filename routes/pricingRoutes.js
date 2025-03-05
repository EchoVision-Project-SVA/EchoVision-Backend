const express = require("express");
const pricingController = require("../controllers/pricingController");
const { authenticate, authorizeAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authenticate);
router.use(authorizeAdmin);

router.get("/", pricingController.getAllPricing);

router.post("/", pricingController.createPricing);

router.put("/:id", pricingController.updatePricing);

module.exports = router;
