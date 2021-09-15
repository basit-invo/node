'use strict';

export default {
  up: async (queryInterface: any, Sequelize: any) => {
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
  down: async (queryInterface: any, Sequelize: any) => {
    await queryInterface.dropTable('times');
  },
};
