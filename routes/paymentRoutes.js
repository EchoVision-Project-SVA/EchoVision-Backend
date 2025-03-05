const express = require("express");
const { createPayment, executePayment, cancelPayment } = require("../controllers/paymentController");
const {
    authenticate,
} = require("../middlewares/authMiddleware");

const router = express.Router();
router.use(authenticate);
router.post("/pay", createPayment);
router.get("/success", executePayment);
router.get("/cancel", cancelPayment);

module.exports = router;
