// services/pricingService.js
const Pricing = require("../models/pricing");

const createPricing = async ({ plan_name, price }) => {
    // Ensure we don't create more than 2 pricing records
    const count = await Pricing.count();
    if (count >= 2) {
        throw new Error("Cannot create more than 2 pricing records");
    }
    const pricing = await Pricing.create({ plan_name, price });
    return pricing;
};

const updatePricing = async (id, { plan_name, price }) => {
    const pricing = await Pricing.findByPk(id);
    if (!pricing) {
        throw new Error("Pricing not found");
    }
    await pricing.update({ plan_name, price });
    return pricing;
};

const getAllPricing = async ({ page = 1, limit = 10, search = "" } = {}) => {
    const offset = (page - 1) * limit;
    const whereClause = {};

    if (search) {
        // Filter by plan_name using a case-insensitive match
        whereClause.plan_name = { [Pricing.sequelize.Op.Like]: `%${search}%` };
    }

    const { count, rows } = await Pricing.findAndCountAll({
        where: whereClause,
        limit,
        offset,
    });

    return {
        total: count,
        page,
        limit,
        pricing: rows,
    };
};

module.exports = {
    createPricing,
    updatePricing,
    getAllPricing,
};
