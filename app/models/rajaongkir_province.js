'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rajaongkir_province extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  rajaongkir_province.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    'name': {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'rajaongkir_province',
    tableName: 'rajaongkir_provinces',
    createdAt: false,
    updatedAt: false,
    deletedAt: false,
  });
  return rajaongkir_province;
};