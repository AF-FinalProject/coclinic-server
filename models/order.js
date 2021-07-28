"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Order extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Order.belongsTo(models.User);
			Order.hasOne(models.Location);
			Order.hasMany(models.Location_Log);
		}
	}
	Order.init(
		{
			status_payment: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				validate: {
					notNull: {
						args: true,
						msg: "Payment status must not be null",
					},
					notEmpty: {
						args: true,
						msg: "Payment status must not be empty",
					},
				},
			},
			status_swab: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						args: true,
						msg: "Swab status must not be null",
					},
					notEmpty: {
						args: true,
						msg: "Swab status must not be empty",
					},
				},
			},
			type_swab: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						args: true,
						msg: "Swab type must not be null",
					},
					notEmpty: {
						args: true,
						msg: "Swab type must not be empty",
					},
				},
			},
			date_swab: {
				type: DataTypes.DATE,
				allowNull: false,
				validate: {
					notNull: {
						args: true,
						msg: "Swab date must not be null",
					},
					notEmpty: {
						args: true,
						msg: "Swab date must not be empty",
					},
					isDate: {
						args: true,
						msg: "Invalid date",
					},
					isAfter: {
						args: new Date().toLocaleDateString(),
						msg: "Swab Date must not be before than today",
					},
				},
			},
			UserId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "Users",
					key: "id",
				},
				validate: {
					notNull: {
						args: true,
						msg: "User Id must not be null",
					},
					isInt: {
						args: true,
						msg: "User Id must be integer",
					},
				},
			},
			LocationId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "Locations",
					key: "id",
				},
				validate: {},
			},
		},
		{
			hooks: {
				beforeCreate: (order) => {
					if (!order.status_payment) order.status_payment = false;
					if (!order.type_swab) order.type_swab = "PCR";
				},
			},
			sequelize,
			modelName: "Order",
		}
	);
	return Order;
};
