const router = require('express').Router()
const api = require('../api')
const jwt = require('../../config/config_jwt')

module.exports = (app) =>{

    // User
    router.post('/signup', api.user.signUp)
    router.post('/signin', api.user.signIn)
    router.get('/user', jwt.authenticateToken ,api.user.findOne)

    // Barang
    router.get('/barang', api.barang.findAll)
    router.post('/barang', jwt.authenticateToken ,api.barang.create)
    router.get('/barang/:id', api.barang.findOne)
    router.put('/barang/:id', jwt.authenticateToken ,api.barang.update)
    router.delete('/barang/:id', api.barang.destroy)

    // Pemesanan
    router.get('/pemesanan', jwt.authenticateToken ,api.pemesanan.findAll)
    router.post('/pemesanan', jwt.authenticateToken ,api.pemesanan.create)
    router.get('/pemesanan/:id', jwt.authenticateToken ,api.pemesanan.findOne)
    // router.put('/pemesanan/:id', api.pemesanan.update)
    router.delete('/pemesanan/:id', jwt.authenticateToken ,api.pemesanan.destroy)

    // PemesananDetail
    router.get('/pemesanan_detail', jwt.authenticateToken ,api.pemesanan_detail.findAll)
    router.get('/pemesanan_detail/:id', jwt.authenticateToken ,api.pemesanan_detail.findOne)

    app.use('/api', router)
}