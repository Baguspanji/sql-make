'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class district extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  district.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    'city_id': {
      type: DataTypes.INTEGER
    },
    'shipper_district_id': {
      type: DataTypes.INTEGER
    },
    'name': {
      type: DataTypes.STRING
    },
    'postal_code': {
      type: DataTypes.STRING
    },
    'latitude': {
      type: DataTypes.STRING
    },
    'longitude': {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'district',
    tableName: 'districts',
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
  });
  return district;
};