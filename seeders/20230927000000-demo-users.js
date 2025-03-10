"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash("password123", 10); 
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          id: 1,
          first_name: "John",
          last_name: "Doe",
          email: "john.doe@example.com",
          password: hashedPassword,
          is_admin: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          first_name: "Admin",
          last_name: "User",
          email: "admin@example.com",
          password: hashedPassword,
          is_admin: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
