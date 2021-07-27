'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      status_payment: {
        type: Sequelize.BOOLEAN
      },
      status_swab: {
        type: Sequelize.STRING
      },
      type_swab: {
        type: Sequelize.STRING
      },
      date_swab: {
        type: Sequelize.DATE
      },
      UserId: {
        type: Sequelize.INTEGER
      },
      LocationId: {
        type: Sequelize.INTEGER
      },
      LocationLogId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orders');
  }
};