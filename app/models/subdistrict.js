'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class subdistrict extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.subdistrict.belongsTo(models.district, {
        foreignKey: 'district_id',
      })
    }
  };
  subdistrict.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    'district_id': {
      type: DataTypes.INTEGER
    },
    'shipper_id': {
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
    modelName: 'subdistrict',
    tableName: 'subdistricts',
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
  });
  return subdistrict;
};