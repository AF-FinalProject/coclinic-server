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
      Location_Log.belongsTo(models.Order)
    }
  };
  Location_Log.init({
    latitude: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Latitude must not be null'
        },
        isDecimal: {
          args: true,
          msg: 'Invalid latitude'
        }
      }
    },
    longitude: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Longitude must not be null'
        },
        isDecimal: {
          args: true,
          msg: 'Invalid longitude'
        }
      }
    },
    OrderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Orders',
        key: 'id'
      },
      validate: {
        notNull: {
          args: true,
          msg: 'Order Id must not be null'
        },
        isInt: {
          args: true,
          msg: 'Order Id must be integer'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Location_Log',
  });
  return Location_Log;
};