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
			Order.hasOne(models.Live_Tracking);
			Order.hasMany(models.Location_Log);
			Order.hasMany(models.Transaction)
		}
	}
	Order.init(
		{
			status_payment: {
				type: DataTypes.STRING,
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
			UserId: DataTypes.INTEGER,
		},
		{
			hooks: {
				beforeCreate: (order) => {
					if (!order.status_payment) order.status_payment = "Belum bayar";
					if (!order.type_swab) order.type_swab = "PCR";
					if (!order.status_swab) order.status_swab = "Menunggu"; 
					return order
				},
			},
			sequelize,
			modelName: "Order",
		}
	);
	return Order;
};
