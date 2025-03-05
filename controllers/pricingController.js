// controllers/pricingController.js
const pricingService = require("../services/pricingService");

const getAllPricing = async (req, res) => {
    try {
        // Optionally extract pagination/search parameters if you support them
        const pricingData = await pricingService.getAllPricing();
        res.json(pricingData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createPricing = async (req, res) => {
    try {
        const { plan_name, price } = req.body;
        const newPricing = await pricingService.createPricing({ plan_name, price });
        res.status(201).json(newPricing);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updatePricing = async (req, res) => {
    try {
        const updatedPricing = await pricingService.updatePricing(req.params.id, req.body);
        res.json(updatedPricing);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getAllPricing,
    createPricing,
    updatePricing,
};
