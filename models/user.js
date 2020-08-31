'use strict';
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
    }
  };
  User.init({
    user_id: DataTypes.STRING,
    full_name: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role_id: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    flag_active: DataTypes.BOOLEAN,
    flag_block: DataTypes.BOOLEAN,
    user_create_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};