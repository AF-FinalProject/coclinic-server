'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addConstraint('Location_Logs', {
      fields: ['OrderId'],
      type: 'foreign key',
      name: 'fk_location_log_OrderId',
      references: {
        table: 'Orders',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Location_Logs', 'fk_location_log_OrderId');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
