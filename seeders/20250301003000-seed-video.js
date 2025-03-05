'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Videos', [
            {
                file_path: '/uploads/video1.mp4',
                status: 'pending',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                file_path: '/uploads/video2.mp4',
                status: 'finished',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Videos', null, {});
    },
};
