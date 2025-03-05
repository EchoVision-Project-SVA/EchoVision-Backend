const Subscription = require("../models/subscription");
const User = require("../models/user");
const Pricing = require("../models/pricing");
const { Op } = require("sequelize");

const formatYearMonthDay = (date) => {
  if (!date) return null;
  return new Date(date).toISOString().slice(0, 10);
};

const getAllSubscriptions = async ({ page = 1, limit = 10, search = "" } = {}) => {
  const offset = (page - 1) * limit;
  const whereClause = {};

  if (search) {

    whereClause[Op.or] = [
      { "$User.first_name$": { [Op.Like]: `%${search}%` } },
      { "$User.last_name$": { [Op.Like]: `%${search}%` } },
      { "$Pricing.plan_name$": { [Op.Like]: `%${search}%` } },
    ];
  }

  const { count, rows } = await Subscription.findAndCountAll({
    where: whereClause,
    include: [
      {
        model: User,
        attributes: ["first_name", "last_name"],
      },
      {
        model: Pricing,
        attributes: ["plan_name", "price"],
      },
    ],
    limit,
    offset,
  });


  const formattedSubscriptions = rows.map((subscription) => {
    const subs = subscription.toJSON();
    subs.createdAt = formatYearMonthDay(subs.createdAt);
    subs.expiration_date = formatYearMonthDay(subs.expiration_date);
    return subs;
  });

  return {
    total: count,
    page,
    limit,
    subscriptions: formattedSubscriptions,
  };
};

const getSubscriptionById = async (id) => {
  const subscription = await Subscription.findByPk(id, {
    include: [
      {
        model: User,
        attributes: ["first_name", "last_name"],
      },
      {
        model: Pricing,
        attributes: ["plan_name", "price"],
      },
    ],
  });

  if (subscription) {
    const subs = subscription.toJSON();
    subs.createdAt = formatYearMonthDay(subs.createdAt);
    subs.expiration_date = formatYearMonthDay(subs.expiration_date);
    return subs;
  }
  return subscription;
};

const createSubscription = async ({ user_id, pricing_id }) => {

  const pricing = await Pricing.findByPk(pricing_id);
  if (!pricing) {
    throw new Error("Invalid pricing id");
  }

  const currentDate = new Date();
  let expiration_date;

  if (
    pricing.plan_name.toLowerCase().includes("premium") ||
    pricing.plan_name.toLowerCase().includes("yearly")
  ) {
    expiration_date = new Date(currentDate.setFullYear(currentDate.getFullYear() + 1));
  } else {
    expiration_date = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
  }

  const subscription = await Subscription.create({
    user_id,
    pricing_id,
    expiration_date,
  });

  return {
    id: subscription.id,
    user_id: subscription.user_id,
    pricing_id: subscription.pricing_id,
    expiration_date: formatYearMonthDay(subscription.expiration_date),
  };
};

const updateSubscription = async (id, { pricing_id }) => {

  const pricing = await Pricing.findByPk(pricing_id);
  if (!pricing) {
    throw new Error("Invalid pricing id");
  }

  const subscription = await Subscription.findByPk(id);
  if (!subscription) {
    throw new Error("Subscription not found");
  }

  const currentDate = new Date();
  let expiration_date;
  if (
    pricing.plan_name.toLowerCase().includes("premium") ||
    pricing.plan_name.toLowerCase().includes("yearly")
  ) {
    expiration_date = new Date(currentDate.setFullYear(currentDate.getFullYear() + 1));
  } else {
    expiration_date = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
  }

  await subscription.update({ pricing_id, expiration_date });

  return {
    id: subscription.id,
    user_id: subscription.user_id,
    pricing_id: subscription.pricing_id,
    expiration_date: formatYearMonthDay(subscription.expiration_date),
  };
};

const deleteSubscription = async (id) => {
  const subscription = await Subscription.findByPk(id);
  if (!subscription) {
    throw new Error("Subscription not found");
  }
  return await subscription.destroy();
};

module.exports = {
  getAllSubscriptions,
  getSubscriptionById,
  createSubscription,
  updateSubscription,
  deleteSubscription,
};
