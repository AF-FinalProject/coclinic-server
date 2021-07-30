"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Live_Trackings", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			latitude: {
				type: Sequelize.DOUBLE,
				allowNull: false,
			},
			longitude: {
				type: Sequelize.DOUBLE,
				allowNull: false,
			},
			OrderId: {
				type: Sequelize.INTEGER,
				references: {
					model: 'Orders',
					key: 'id'
				},
				onDelete: 'cascade',
				onUpdate: 'cascade'

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
		await queryInterface.dropTable("Live_Tracking");
	},
};
