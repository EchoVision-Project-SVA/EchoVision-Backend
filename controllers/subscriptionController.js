// controllers/subscriptionController.js
const subscriptionService = require("../services/subscriptionService");

const getAllSubscriptions = async (req, res) => {
  try {
    // Extract query parameters for pagination and search.
    const { page = 1, limit = 10, search = "" } = req.query;
    const subscriptions = await subscriptionService.getAllSubscriptions({
      page: Number(page),
      limit: Number(limit),
      search,
    });
    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSubscriptionById = async (req, res) => {
  try {
    const subscription = await subscriptionService.getSubscriptionById(req.params.id);
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }
    res.json(subscription);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSubscription = async (req, res) => {
  try {
    const { user_id, pricing_id } = req.body;
    const subscription = await subscriptionService.createSubscription({ user_id, pricing_id });
    res.status(201).json(subscription);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateSubscription = async (req, res) => {
  try {
    const { pricing_id } = req.body;
    const subscription = await subscriptionService.updateSubscription(req.params.id, { pricing_id });
    res.json(subscription);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteSubscription = async (req, res) => {
  try {
    await subscriptionService.deleteSubscription(req.params.id);
    res.status(200).json({ message: "Subscription deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllSubscriptions,
  getSubscriptionById,
  createSubscription,
  updateSubscription,
  deleteSubscription,
};
