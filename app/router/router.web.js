const router = require('express').Router()
const controller = require('../controllers')

module.exports = (app) => {

    // Barang
    router.get('/barang', controller.barang.findAll)
    router.get('/barang/add', controller.barang.formAdd)
    router.post('/barang', controller.barang.create)
    router.get('/barang/edit/:id', controller.barang.formEdit)
        // router.get('/barang/:id', controller.barang.findOne)
    router.post('/barang/:id', controller.barang.update)
    router.get('/barang/delete/:id', controller.barang.destroy)

    router.get('/get_barang', controller.barang.getBarang)

    app.use('/', router)
}