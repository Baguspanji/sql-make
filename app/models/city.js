'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class city extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        models.city.belongsTo(models.province, {
            foreignKey: 'province_id',
        })
    }
  };
  city.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    'province_id': {
      type: DataTypes.INTEGER
    },
    'shipper_id': {
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
    modelName: 'city',
    tableName: 'cities',
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
  });
  return city;
};