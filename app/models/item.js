'use strict';
const {
  Model
} = require('sequelize');

const order_detail = require('./order_detail');

module.exports = (sequelize, DataTypes) => {
  class item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // order_detail.belongsToMany(models.item, {
      //   through: 'order_detail',
      //   as: 'items',
      //   foreignKey: 'item_id'
      // })
    }
  };
  item.init({
    id: {
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    strike_price: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'item',
    tableName: 'items'
  });
  return item;
};