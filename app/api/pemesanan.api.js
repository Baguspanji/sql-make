const Pemesanan = require('../models').pemesanan;
const PemesananDetail = require('../models').pemesanan_detail;

exports.findAll = (req, res) => {
    Pemesanan
        .findAll({
            include: [PemesananDetail],
            attributes: ['id_pemesanan', 'total']
        })
        .then((pemesanan) => {
            res.status(200).send({
                status: true,
                message: 'item succesfully',
                data: pemesanan
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
    Pemesanan
        .create({
            total: req.body.total
        })
        .then((pemesanan) => {
            var barangs = req.body.barangs
            console.log(barangs)
            
            barangs.forEach(barang => {
                console.log(pemesanan.id_pemesanan);
                PemesananDetail
                    .create({
                        pemesanan_id: pemesanan.id_pemesanan,
                        barang_id: barang.id_barang,
                        qty: barang.qty,
                        jumlah: barang.jumlah
                    })
                    .then((pemesananDetail) => {
                        res.status(200).send({
                            status: true,
                            message: 'item created succesfully',
                            data: pemesanan
                        })
                    })
                    .catch((error) => {
                        res.status(402).send({
                            status_response: 'Pemesanan Detail Bad Request',
                            errors: error.errors
                        })
                    })
            });
        })
        .catch((error) => {
            res.status(401).send({
                status_response: 'Pemesanan Bad Request',
                errors: error.errors
            })
        })
}

exports.findOne = (req, res) => {
    Pemesanan
        .findOne({
            where: {
                id_pemesanan: req.params.id
            },
            include: [PemesananDetail],
            attributes: ['id_pemesanan', 'total']
        })
        .then((pemesanan) => {
            res.status(200).send({
                status: true,
                message: 'item succesfully',
                data: pemesanan
            })
        })
        .catch((error) => {
            res.status(401).send({
                status_response: 'Bad Request',
                errors: error.errors
            })
        })
}

// exports.update = (req, res) => {
//     Pemesanan
//         .update({
//             nama_pemesanan: req.body.nama_pemesanan,
//             harga: req.body.harga
//         }, {
//             where: {
//                 id_pemesanan: req.params.id
//             }
//         })
//         .then((pemesanan) => {
//             res.status(200).send({
//                 status: true,
//                 message: 'item updated succesfully',
//                 data: pemesanan
//             })
//         })
//         .catch((error) => {
//             res.status(401).send({
//                 status_response: 'Bad Request',
//                 errors: error.errors
//             })
//         })
// }

exports.destroy = (req, res) => {
    Pemesanan
        .destroy({
            where: {
                id_pemesanan: req.params.id
            }
        })
        .then((pemesanan) => {
            PemesananDetail
                .destroy({
                    where: {
                        pemesanan_id: req.params.id
                    }
                })
                .then((pemesananDetail) => {
                    res.status(200).send({
                        status: true,
                        message: 'item deleted succesfully',
                        data: pemesanan
                    })
                })
                .catch((error) => {
                    res.status(401).send({
                        status_response: 'Bad Request',
                        errors: error.errors
                    })
                })
        })
        .catch((error) => {
            res.status(401).send({
                status_response: 'Bad Request',
                errors: error.errors
            })
        })
}