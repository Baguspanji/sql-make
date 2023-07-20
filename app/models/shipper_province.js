'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class shipper_province extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  shipper_province.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    'name': {
      type: DataTypes.STRING
    },
    'latitude': {
      type: DataTypes.STRING,
      allowNull: true,
    },
    'longitude': {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'shipper_province',
    tableName: 'shipper_provinces',
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
  });
  return shipper_province;
};