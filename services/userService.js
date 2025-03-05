// services/userService.js
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const User = require("../models/user");

const getAllUsers = async ({ page = 1, limit = 10, search = "" } = {}) => {
  const offset = (page - 1) * limit;
  const where = {};

  if (search) {
    where[Op.or] = [
      { first_name: { [Op.like]: `%${search}%` } },
      { last_name: { [Op.like]: `%${search}%` } },
      { email: { [Op.like]: `%${search}%` } },
    ];
  }

  // Using findAndCountAll to get both the rows and the total count
  const { count, rows } = await User.findAndCountAll({
    where,
    limit,
    offset,
  });

  return {
    total: count,
    page,
    limit,
    users: rows,
  };
};

const getUserById = async (id) => {
  return await User.findByPk(id);
};

const createUser = async (userData) => {
  if (userData.password) {
    userData.password = await bcrypt.hash(userData.password, 10);
  }
  return await User.create(userData);
};

const updateUser = async (id, userData) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error("User not found");
  }
  if (userData.password) {
    userData.password = await bcrypt.hash(userData.password, 10);
  }
  return await user.update(userData);
};

const deleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error("User not found");
  }
  return await user.destroy();
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
