const authService = require("../services/authService");

const signup = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    const user = await authService.signup(
      first_name,
      last_name,
      email,
      password
    );
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.json(result);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = { signup, login };
