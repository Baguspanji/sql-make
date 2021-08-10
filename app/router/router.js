const router = require('express').Router()
const api = require('../api')

module.exports = (app) =>{

    // Barang
    router.get('/barang', api.barang.findAll)
    router.post('/barang', api.barang.create)
    router.get('/barang/:id', api.barang.findOne)
    router.put('/barang/:id', api.barang.update)
    router.delete('/barang/:id', api.barang.destroy)

    // Pemesanan
    router.get('/pemesanan', api.pemesanan.findAll)
    router.post('/pemesanan', api.pemesanan.create)
    router.get('/pemesanan/:id', api.pemesanan.findOne)
    // router.put('/pemesanan/:id', api.pemesanan.update)
    router.delete('/pemesanan/:id', api.pemesanan.destroy)

    // PemesananDetail
    router.get('/pemesanan_detail', api.pemesanan_detail.findAll)
    router.get('/pemesanan_detail/:id', api.pemesanan_detail.findOne)

    app.use('/api', router)
}