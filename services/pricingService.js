const Pricing = require("../models/pricing");

const createPricing = async ({ plan_name, price }) => {

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

const getPricingById = async (id) => {
    const pricing = await Pricing.findByPk(Number(id));
    return pricing;
};

const deletePricing = async (id) => {
    const pricing = await Pricing.findByPk(Number(id));
    if (!pricing) {
        throw new Error("Pricing not found");
    }
    await pricing.destroy();
    return pricing;
};

module.exports = {
    createPricing,
    updatePricing,
    getAllPricing,
    getPricingById,
    deletePricing,
};
