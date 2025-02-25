const authService = require("../services/authService");
const Subscription = require("../models/subscription");

const signup = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await authService.signup(
      first_name,
      last_name,
      email,
      password
    );
    res.status(201).json({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      is_admin: user.is_admin,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const user = await authService.login(email, password);
    const token = authService.generateToken(user); // Single access token
    if (user.is_admin) {
      res.json({ is_admin: true, token });
    } else {
      const subscription = await Subscription.findOne({
        where: { user_id: user.id },
      });
      const subscription_expiration = subscription
        ? subscription.expiration_date
        : null;
      res.json({ is_admin: false, subscription_expiration, token });
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const logout = (req, res) => {
  // No server-side token invalidation; client should discard the token
  res.json({ message: "Logged out successfully" });
};

module.exports = { signup, login, logout };
