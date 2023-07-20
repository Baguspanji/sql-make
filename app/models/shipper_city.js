'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class shipper_city extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.shipper_city.belongsTo(models.shipper_province, {
        foreignKey: 'province_id'
      })
    }
  };
  shipper_city.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    'province_id': {
      type: DataTypes.INTEGER
    },
    'name': {
      type: DataTypes.STRING
    },
    'type': {
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
    modelName: 'shipper_city',
    tableName: 'shipper_cities',
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
  });
  return shipper_city;
};