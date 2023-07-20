'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class shipper_subdistrict extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.shipper_subdistrict.belongsTo(models.shipper_district, {
        foreignKey: 'district_id',
      })
    }
  };
  shipper_subdistrict.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    'district_id': {
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
    'postcode': {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'shipper_subdistrict',
    tableName: 'shipper_subdistricts',
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
  });
  return shipper_subdistrict;
};