const paymentService = require("../services/paymentService");

const createPayment = async (req, res) => {
    try {
        const { amount, currency } = req.body;
        const approvalUrl = await paymentService.createPayment(amount, currency);

        if (approvalUrl) {
            res.status(200).json({ success: true, url: approvalUrl });
        } else {
            res.status(400).json({ success: false, message: "Failed to generate PayPal approval URL" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const executePayment = async (req, res) => {
    try {
        const { paymentId, PayerID } = req.query;
        const payment = await paymentService.executePayment(paymentId, PayerID);
        res.status(200).json({ success: true, payment });
    } catch (error) {
        res.status(500).json({ success: false, message: "Payment execution failed", error });
    }
};

const cancelPayment = (req, res) => {
    res.status(200).json({ success: false, message: "Payment canceled by user" });
};

module.exports = { createPayment, executePayment, cancelPayment };
