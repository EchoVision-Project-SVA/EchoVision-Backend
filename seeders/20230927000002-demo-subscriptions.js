"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Subscriptions",
      [
        {
          user_id: 1, // Matches John Doe
          pricing_id: 1, // Assumes pricing plan with ID 1 corresponds to monthly pricing
          expiration_date: new Date(
            new Date().setMonth(new Date().getMonth() + 1)
          ),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 2, // Matches Admin User
          pricing_id: 2, // Assumes pricing plan with ID 2 corresponds to yearly pricing
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
