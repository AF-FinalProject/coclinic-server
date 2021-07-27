'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Location_Log extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Location_Log.init({
    latitude: DataTypes.DOUBLE,
    longitude: DataTypes.DOUBLE,
    OrderId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Location_Log',
  });
  return Location_Log;
};