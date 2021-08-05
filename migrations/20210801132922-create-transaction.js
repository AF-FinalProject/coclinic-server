'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      transaction_id_midtrans: {
        type: Sequelize.STRING
      },
      transaction_time: {
        type: Sequelize.DATE
      },
      transaction_status: {
        type: Sequelize.STRING
      },
      payment_type: {
        type: Sequelize.STRING
      },
      currency: {
        type: Sequelize.STRING
      },
      gross_amount: {
        type: Sequelize.INTEGER
      },
      fraud_status: {
        type: Sequelize.STRING
      },
      approval_code: {
        type: Sequelize.STRING
      },
      settlement_time: {
        type: Sequelize.DATE
      },
      OrderId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Orders',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
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
    await queryInterface.dropTable('Transactions');
  }
};