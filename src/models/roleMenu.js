'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoleMenu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    }
  }
  RoleMenu.init({
    roleID: DataTypes.INTEGER,
    menuID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RoleMenu',
  });
  return RoleMenu;
};