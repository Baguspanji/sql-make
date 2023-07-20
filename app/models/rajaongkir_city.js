'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rajaongkir_city extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  rajaongkir_city.init({
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
    'postal_code': {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'rajaongkir_city',
    tableName: 'rajaongkir_cities',
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
  });
  return rajaongkir_city;
};