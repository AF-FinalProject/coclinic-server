'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.Order)
    }
  };
  Transaction.init({
    transaction_id_midtrans: DataTypes.STRING,
    transaction_time: DataTypes.DATE,
    transaction_status: DataTypes.STRING,
    payment_type: DataTypes.STRING,
    currency: DataTypes.STRING,
    gross_amount: DataTypes.INTEGER,
    fraud_status: DataTypes.STRING,
    settlement_time: DataTypes.DATE,
    approval_code: DataTypes.STRING,
    OrderId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};