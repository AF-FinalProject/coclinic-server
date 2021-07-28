'use strict';
const bcrypt = require('bcrypt');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Order)
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Name must not be null'
        },
        notEmpty: {
          args: true,
          msg: 'Name must not be empty'
        }
      }
    },
    nik: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'NIK must not be null'
        },
        notEmpty: {
          args: true,
          msg: 'NIK must not be empty'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Role must not be null'
        },
        notEmpty: {
          args: true,
          msg: 'Role must not be empty'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Email must not be null'
        },
        notEmpty: {
          args: true,
          msg: 'Email must not be empty'
        },
        isEmail: {
          args: true,
          msg: 'Invalid email address'
        }
      },
      unique: {
          args: true,
          msg: 'Email address already in use'
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Password must not be null'
        },
        notEmpty: {
          args: true,
          msg: 'Password must not be empty'
        },
        len: {
          args: 6,
          msg: "Password must be at least 6 characters"
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Address must not be null'
        },
        notEmpty: {
          args: true,
          msg: 'Address must not be empty'
        }
      }
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Phone Number must not be null'
        },
        notEmpty: {
          args: true,
          msg: 'Phone Number must not be empty'
        }
      }
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Date of Birth must not be null'
        },
        notEmpty: {
          args: true,
          msg: 'Date of Birth must not be empty'
        },
        isDate: {
          args: true,
          msg: 'Invalid date'
        }
      }
    },
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
    }
  }, {
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync(8);
        const hash = bcrypt.hashSync(user.password, salt);
        user.password = hash;
        if (!user.role) user.role = 'customer'
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};