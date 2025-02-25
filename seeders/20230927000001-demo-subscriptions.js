"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Subscriptions",
      [
        {
          user_id: 1, // Matches John Doe
          subscription_type: "Basic",
          expiration_date: new Date("2024-09-27"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 2, // Matches Admin User
          subscription_type: "Premium",
          expiration_date: new Date("2025-09-27"),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Subscriptions", null, {});
  },
};
