'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Pricings', [
            {
                plan_name: 'Basic',
                price: 9.99,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                plan_name: 'Premium',
                price: 19.99,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Pricings', null, {});
    }
};
