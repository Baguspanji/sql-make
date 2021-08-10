const Barang = require('../models').barang;

exports.findAll = (req, res) => {
    Barang
        .findAll({
            attributes: ['id_barang', 'nama_barang', 'harga']
        })
        .then((barang) => {
            res.status(200).send({
                status: true,
                message: 'item succesfully',
                data: barang
            })
        })
        .catch((error) => {
            res.status(401).send({
                status_response: 'Bad Request',
                errors: error
            })
        })
}

exports.create = (req, res) => {
    Barang
        .create({
            nama_barang: req.body.nama_barang,
            harga: req.body.harga
        })
        .then((barang) => {
            res.status(200).send({
                status: true,
                message: 'item created succesfully',
                data: barang
            })
        })
        .catch((error) => {
            res.status(401).send({
                status_response: 'Bad Request',
                errors: error.errors
            })
        })
}

exports.findOne = (req, res) => {
    Barang
        .findOne({
            where: {
                id_barang: req.params.id
            },
            attributes: ['id_barang', 'nama_barang', 'harga']
        })
        .then((barang) => {
            res.status(200).send({
                status: true,
                message: 'item succesfully',
                data: barang
            })
        })
        .catch((error) => {
            res.status(401).send({
                status_response: 'Bad Request',
                errors: error.errors
            })
        })
}

exports.update = (req, res) => {
    Barang
        .update({
            nama_barang: req.body.nama_barang,
            harga: req.body.harga
        }, {
            where: {
                id_barang: req.params.id
            }
        })
        .then((barang) => {
            res.status(200).send({
                status: true,
                message: 'item updated succesfully',
                data: barang
            })
        })
        .catch((error) => {
            res.status(401).send({
                status_response: 'Bad Request',
                errors: error.errors
            })
        })
}

exports.destroy = (req, res) => {
    Barang
        .destroy({
            where: {
                id_barang: req.params.id
            }
        })
        .then((barang) => {
            res.status(200).send({
                status: true,
                message: 'item deleted succesfully',
                data: barang
            })
        })
        .catch((error) => {
            res.status(401).send({
                status_response: 'Bad Request',
                errors: error.errors
            })
        })
}