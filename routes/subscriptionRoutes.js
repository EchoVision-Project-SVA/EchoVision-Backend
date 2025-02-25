const express = require("express");
const subscriptionController = require("../controllers/subscriptionController");
const {
  authenticate,
  authorizeAdmin,
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authenticate);
router.post("/", subscriptionController.createSubscription);
router.use(authorizeAdmin);

router.get("/", subscriptionController.getAllSubscriptions);
router.get("/:id", subscriptionController.getSubscriptionById);
router.put("/:id", subscriptionController.updateSubscription);
router.delete("/:id", subscriptionController.deleteSubscription);

module.exports = router;
