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
				type: Sequelize.STRING,
				defaultValue: 'Belum bayar',
			},
			status_swab: {
				type: Sequelize.STRING,
				defaultValue: 'Menunggu',
			},
			type_swab: {
				type: Sequelize.STRING,
				defaultValue: 'PCR',
			},
			date_swab: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			UserId: {
				type: Sequelize.INTEGER,
        references: {
          model: 'Users',
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
		await queryInterface.dropTable("Orders");
	},
};
