'use strict';
const {
  Model
} = require('sequelize');

const order = require('./order');
const item = require('./item');

module.exports = (sequelize, DataTypes) => {
  class order_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // order.belongsTo(models.order, {
      //   foreignKey: 'order_id',
      //   targetKey: 'id'
      // })

      // item.belongsTo(models.item, {
      //   foreignKey: 'item_id',
      //   targetKey: 'id'
      // })
    }
  };
  order_detail.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'order',
        key: 'id'
      }
    },
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'item',
        key: 'id'
      }
    },
    qty: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    jumlah: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'order_detail',
  });
  return order_detail;
};