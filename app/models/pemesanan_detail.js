'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pemesanan_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      pemesanan_detail.belongsTo(models.pemesanan, {
        foreignKey: 'pemesanan_id',
        targetKey: 'id_pemesanan'
      })

      pemesanan_detail.belongsTo(models.barang, {
        foreignKey: 'barang_id',
        targetKey: 'id_barang'
      })
    }
  };
  pemesanan_detail.init({
    id_pemesanan_detail: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    pemesanan_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    barang_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    jumlah: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'pemesanan_detail',
  });
  return pemesanan_detail;
};