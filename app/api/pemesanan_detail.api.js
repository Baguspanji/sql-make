const Barang = require('../models').barang;
const Pemesanan = require('../models').pemesanan;
const PemesananDetail = require('../models').pemesanan_detail;

exports.findAll = (req, res) => {
    PemesananDetail
        .findAll({
            include: [Barang],
            attributes: ['id_pemesanan_detail', 'pemesanan_id', 'barang_id', 'qty', 'jumlah']
        })
        .then((pemesananDetail) => {
            res.status(200).send({
                status: true,
                message: 'item succesfully',
                data: pemesananDetail
            })
        })
        .catch((error) => {
            res.status(401).send({
                status_response: 'Bad Request',
                errors: error
            })
        })
}

exports.findOne = (req, res) => {
    PemesananDetail
        .findOne({
            where: {
                id_pemesanan_detail: req.params.id
            },
            include: [Barang],
            attributes: ['id_pemesanan_detail', 'pemesanan_id', 'barang_id', 'qty', 'jumlah']
        })
        .then((pemesananDetail) => {
            res.status(200).send({
                status: true,
                message: 'item succesfully',
                data: pemesananDetail
            })
        })
        .catch((error) => {
            res.status(401).send({
                status_response: 'Bad Request',
                errors: error.errors
            })
        })
}