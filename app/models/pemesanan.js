'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pemesanan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      pemesanan.hasMany(models.pemesanan_detail, {
        foreignKey: 'pemesanan_id',
        targetKey: 'id_pemesanan'
      })
    }
  };
  pemesanan.init({
    id_pemesanan: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    total: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'pemesanan',
    tableName: 'pemesanans'
  });
  return pemesanan;
};