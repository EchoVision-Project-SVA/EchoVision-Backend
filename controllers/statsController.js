const statsService = require("../services/statsService");

const getDashboardStats = async (req, res) => {
    try {
        const stats = await statsService.getDashboardStats();
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getDashboardStats };
