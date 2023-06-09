const Item = require('../models').item;
const toRupiah = require('../helpers/toRupiah')

exports.findAll = (req, res) => {
    res.locals = {
        title: 'Daftar Barang',
        tabel_list: '/get_item'
    };

    res.render('item');
}

exports.getItem = (req, res) => {
    Item
        .findAll({
            order : [
                ['id', 'DESC']
            ],
            attributes: ['id', 'name', 'price', 'strike_price', 'image']
        })
        .then((items) => {

            var list = [];
            let i = 0;

            items.forEach(item => {
                i++

                var edit = '<a href="/item/edit/' + item.id + '" class="btn btn-warning">Edit</a>'
                var hapus = '<a href="/item/delete/' + item.id + '" class="btn btn-danger">Hapus</a>'
                var row = [
                    i,
                    '<img src="' + item.image + '" width="180px" />',
                    item.name,
                    toRupiah.convertToRupiah(item.price),
                    toRupiah.convertToRupiah(item.strike_price),
                    edit + ' ' + hapus
                ]
                list.push(row)
            });

            res.status(200).send({
                data: list
            })
        })
        .catch((error) => {
            res.status(401).send({
                status_response: 'Bad Request',
                errors: error
            })
        })
}

exports.formAdd = (req, res) => {
    res.locals = {
        title: 'Tambah Barang',
    };

    res.render('item/form');
}

exports.create = (req, res) => {
    const body = req.body;

    Item
        .create(body)
        .then((_) => {
            res.redirect('/item');
        })
        .catch((error) => {
            res.status(401).send({
                status_response: 'Bad Request',
                errors: error.errors
            })
        })
}

exports.findOne = (req, res) => {
    Item
        .findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id', 'name', 'price', 'strike_price', 'image']
        })
        .then((item) => {
            res.status(200).send({
                status: true,
                message: 'Data berhasil ditemukan',
                data: item
            })
        })
        .catch((error) => {
            res.status(401).send({
                status_response: 'Bad Request',
                errors: error.errors
            })
        })
}

exports.formEdit = (req, res) => {
    Item
        .findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id', 'name', 'price', 'strike_price', 'image']
        })
        .then((item) => {

            res.locals = {
                title: 'Edit Barang',
                data: item,
            };

            res.render('item/form');
        })
        .catch((error) => {
            res.status(401).send({
                status_response: 'Bad Request',
                errors: error.errors
            })
        })
}

exports.update = (req, res) => {
    const body = req.body;

    Item
        .update(body, {
            where: {
                id: req.params.id
            }
        })
        .then((_) => {
            res.redirect('/item');
        })
        .catch((error) => {
            res.status(401).send({
                status_response: 'Bad Request',
                errors: error.errors
            })
        })
}

exports.destroy = (req, res) => {
    Item
        .destroy({
            where: {
                id: req.params.id
            }
        })
        .then((_) => {
            res.redirect('/item');
        })
        .catch((error) => {
            res.status(401).send({
                status_response: 'Bad Request',
                errors: error.errors
            })
        })
}

exports.uploadFile = async (req, res) => {
    try {
        // take path after public
        const file = req.file.path.split('public')[1];
        const url = file;

        res.status(200).send({
            status: true,
            message: 'File berhasil diupload',
            data: url
        })
    } catch (error) {
        res.status(401).send({
            status_response: 'Bad Request',
            errors: error.errors
        })
    }
}