const Subscription = require("../models/subscription");
const { Op } = require("sequelize");

const getAllSubscriptions = async () => {
  return await Subscription.findAll();
};

const getSubscriptionById = async (id) => {
  return await Subscription.findByPk(id);
};

const createSubscription = async ({ user_id, subscription_type }) => {
  if (!["monthly", "yearly"].includes(subscription_type.toLowerCase())) {
    throw new Error("Invalid subscription type. Choose 'monthly' or 'yearly'.");
  }

  const currentDate = new Date();
  const expiration_date =
    subscription_type.toLowerCase() === "yearly"
      ? new Date(currentDate.setFullYear(currentDate.getFullYear() + 1))
      : new Date(currentDate.setMonth(currentDate.getMonth() + 1));

  const subscription = await Subscription.create({
    user_id,
    subscription_type,
    expiration_date,
  });

  return {
    id: subscription.id,
    user_id: subscription.user_id,
    subscription_type: subscription.subscription_type,
    expiration_date: subscription.expiration_date,
  };
};

const updateSubscription = async (id, { subscription_type }) => {
  if (!["monthly", "yearly"].includes(subscription_type.toLowerCase())) {
    throw new Error("Invalid subscription type. Choose 'monthly' or 'yearly'.");
  }

  const subscription = await Subscription.findByPk(id);
  if (!subscription) {
    throw new Error("Subscription not found");
  }

  const currentDate = new Date();
  const expiration_date =
    subscription_type.toLowerCase() === "yearly"
      ? new Date(currentDate.setFullYear(currentDate.getFullYear() + 1))
      : new Date(currentDate.setMonth(currentDate.getMonth() + 1));

  await subscription.update({ subscription_type, expiration_date });

  return {
    id: subscription.id,
    user_id: subscription.user_id,
    subscription_type: subscription.subscription_type,
    expiration_date: subscription.expiration_date,
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
