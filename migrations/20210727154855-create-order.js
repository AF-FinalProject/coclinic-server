"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Orders", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			status_payment: {
				type: Sequelize.BOOLEAN,
			},
			status_swab: {
				type: Sequelize.STRING,
			},
			type_swab: {
				type: Sequelize.STRING,
				defaultValue: "PCR",
			},
			date_swab: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			UserId: {
				type: Sequelize.INTEGER,
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
		await queryInterface.dropTable("Orders");
	},
};
