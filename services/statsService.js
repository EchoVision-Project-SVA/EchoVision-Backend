// services/statsService.js
const { Op, fn, col, where } = require("sequelize");
const sequelize = require("../config/database");
const Subscription = require("../models/subscription");
const Pricing = require("../models/pricing");
const User = require("../models/user");

const getDashboardStats = async () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // JS months are 0-indexed
    const currentDay = currentDate.getDate();

    // Annual Sales: Sum of pricing.price for subscriptions created in the current year.
    const annualSalesResult = await Subscription.findOne({
        attributes: [[fn("SUM", col("Pricing.price")), "annualSales"]],
        include: [
            {
                model: Pricing,
                attributes: []
            }
        ],
        where: where(fn("YEAR", col("Subscription.createdAt")), currentYear),
        raw: true,
    });
    const annualSales = parseFloat(annualSalesResult.annualSales) || 0;

    // Monthly Sales: Sum for subscriptions created in the current year and month.
    const monthlySalesResult = await Subscription.findOne({
        attributes: [[fn("SUM", col("Pricing.price")), "monthlySales"]],
        include: [
            {
                model: Pricing,
                attributes: []
            }
        ],
        where: {
            [Op.and]: [
                where(fn("YEAR", col("Subscription.createdAt")), currentYear),
                where(fn("MONTH", col("Subscription.createdAt")), currentMonth)
            ]
        },
        raw: true,
    });
    const monthlySales = parseFloat(monthlySalesResult.monthlySales) || 0;

    // Daily Sales: Sum for subscriptions created on the current day.
    const dailySalesResult = await Subscription.findOne({
        attributes: [[fn("SUM", col("Pricing.price")), "dailySales"]],
        include: [
            {
                model: Pricing,
                attributes: []
            }
        ],
        where: {
            [Op.and]: [
                where(fn("YEAR", col("Subscription.createdAt")), currentYear),
                where(fn("MONTH", col("Subscription.createdAt")), currentMonth),
                where(fn("DAY", col("Subscription.createdAt")), currentDay)
            ]
        },
        raw: true,
    });
    const dailySales = parseFloat(dailySalesResult.dailySales) || 0;

    // Count total users
    const totalUsers = await User.count();

    // Count admin users
    const adminUsers = await User.count({ where: { is_admin: true } });

    // Count subscriptions
    const totalSubscriptions = await Subscription.count();

    return {
        annualSales,
        monthlySales,
        dailySales,
        totalUsers,
        adminUsers,
        totalSubscriptions
    };
};

module.exports = { getDashboardStats };
