"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		queryInterface.addConstraint("Live_Trackings", {
			fields: ["OrderId"],
			type: "foreign key",
			name: "fk_location_OrderId",
			references: {
				table: "Orders",
				field: "id",
			},
			onDelete: "cascade",
			onUpdate: "cascade",
		});
		/**
		 * Add altering commands here.
		 *
		 * Example:
		 * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
		 */
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeConstraint(
			"Live_Trackings",
			"fk_location_OrderId"
		);
		/**
		 * Add reverting commands here.
		 *
		 * Example:
		 * await queryInterface.dropTable('users');
		 */
	},
};
