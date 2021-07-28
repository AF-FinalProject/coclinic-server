"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Live_Tracking extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Live_Tracking.belongsTo(models.Order);
		}
	}
	Live_Tracking.init(
		{
			latitude: {
				type: DataTypes.DOUBLE,
				allowNull: false,
				validate: {
					notNull: {
						args: true,
						msg: "Latitude must not be null",
					},
					isDecimal: {
						args: true,
						msg: "Invalid latitude",
					},
				},
			},
			longitude: {
				type: DataTypes.DOUBLE,
				allowNull: false,
				validate: {
					notNull: {
						args: true,
						msg: "Longitude must not be null",
					},
					isDecimal: {
						args: true,
						msg: "Invalid longitude",
					},
				},
			},
			OrderId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "Orders",
					key: "id",
				},
				validate: {
					notNull: {
						args: true,
						msg: "Order Id must not be null",
					},
					isInt: {
						args: true,
						msg: "Order Id must be integer",
					},
				},
			},
		},
		{
			sequelize,
			modelName: "Live_Tracking",
		}
	);
	return Live_Tracking;
};
