'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('times', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            fajr: {
                type: Sequelize.STRING,
            },
            dhuhr: {
                type: Sequelize.STRING,
            },
            asr: {
                type: Sequelize.STRING,
            },
            maghrib: {
                type: Sequelize.STRING,
            },
            isha: {
                type: Sequelize.STRING,
            },
            timestamp: {
                type: Sequelize.STRING,
            },
            gregorian: {
                type: Sequelize.STRING,
            },
            city: {
                type: Sequelize.STRING,
            },
            country: {
                type: Sequelize.STRING,
            },
            juristic: {
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('times');
    },
};
//# sourceMappingURL=20210810102215-create-time.js.map