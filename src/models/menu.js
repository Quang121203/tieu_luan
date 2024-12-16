'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Menu.belongsToMany(models.Role, { through: models.RoleMenu,foreignKey: 'menuID' })
    }
  }
  Menu.init({
    name: DataTypes.STRING,
    link:DataTypes.STRING,
    icon:DataTypes.STRING,
    isActive:DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Menu',
  });
  return Menu;
};