'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class order_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      order_detail.belongsTo(models.order, {
        foreignKey: 'order_id',
        targetKey: 'id'
      })

      order_detail.belongsTo(models.item, {
        foreignKey: 'item_id',
        targetKey: 'id'
      })
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
    total: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'order_detail',
    deletedAt: 'deletedAt',
    paranoid: true,
    timestamps: true,
  });
  return order_detail;
};