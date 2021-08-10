'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('pemesanan_details', {
      id_pemesanan_detail: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pemesanan_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      barang_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      qty: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      jumlah: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('pemesanan_details');
  }
};