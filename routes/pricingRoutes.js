const express = require("express");
const pricingController = require("../controllers/pricingController");
const { authenticate, authorizeAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authenticate);
router.get("/", pricingController.getAllPricing);

router.use(authorizeAdmin);

router.get("/:id", pricingController.getPricingById);

router.post("/", pricingController.createPricing);

router.put("/:id", pricingController.updatePricing);

router.delete("/:id", pricingController.deletePricing);

module.exports = router;
