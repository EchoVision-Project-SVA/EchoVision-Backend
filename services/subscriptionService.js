const Subscription = require("../models/subscription");

const getAllSubscriptions = async () => {
  return await Subscription.findAll();
};

const getSubscriptionById = async (id) => {
  return await Subscription.findByPk(id);
};

const createSubscription = async (subscriptionData) => {
  return await Subscription.create(subscriptionData);
};

const updateSubscription = async (id, subscriptionData) => {
  const subscription = await Subscription.findByPk(id);
  if (!subscription) {
    throw new Error("Subscription not found");
  }
  return await subscription.update(subscriptionData);
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
