'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MenuDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  MenuDetail.init({
    menu_id: DataTypes.STRING,
    role_id: DataTypes.STRING,
    user_create_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MenuDetail',
  });
  return MenuDetail;
};