const pricingService = require("../services/pricingService");

const getAllPricing = async (req, res) => {
    try {
        const pricingData = await pricingService.getAllPricing();
        res.json(pricingData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPricingById = async (req, res) => {
    try {
        const pricing = await pricingService.getPricingById(req.params.id);
        if (!pricing) {
            return res.status(404).json({ message: "Pricing not found" });
        }
        res.json(pricing);
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

const deletePricing = async (req, res) => {
    try {
        await pricingService.deletePricing(req.params.id);
        res.status(200).json({ message: "Pricing deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getAllPricing,
    getPricingById,
    createPricing,
    updatePricing,
    deletePricing,
};
