'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            city: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            fiqa: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            slack_id: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            channel: {
                type: Sequelize.STRING,
                allowNull: true,
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
        await queryInterface.dropTable('users');
    },
};
//# sourceMappingURL=20210907134359-create-user.js.map