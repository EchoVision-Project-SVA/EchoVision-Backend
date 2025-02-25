"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Subscriptions",
      [
        {
          user_id: 1, // Matches John Doe
          subscription_type: "monthly",
          expiration_date: new Date(
            new Date().setMonth(new Date().getMonth() + 1)
          ),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 2, // Matches Admin User
          subscription_type: "yearly",
          expiration_date: new Date(
            new Date().setFullYear(new Date().getFullYear() + 1)
          ),
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
