'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Order.init({
    status_payment: DataTypes.BOOLEAN,
    status_swab: DataTypes.STRING,
    type_swab: DataTypes.STRING,
    date_swab: DataTypes.DATE,
    UserId: DataTypes.INTEGER,
    LocationId: DataTypes.INTEGER,
    LocationLogId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};