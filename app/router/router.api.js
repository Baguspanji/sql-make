const router = require('express').Router()
const api = require('../api')
const jwt = require('../../config/config_jwt')

module.exports = (app) =>{

    // User
    router.post('/signup', api.user.signUp)
    router.post('/signin', api.user.signIn)
    router.get('/user', jwt.authenticateToken ,api.user.findOne)

    // Barang
    router.get('/item', api.item.findAll)
    router.get('/item/:id', api.item.findOne)

    // order
    router.get('/order', jwt.authenticateToken ,api.order.findAll)
    router.post('/order', jwt.authenticateToken ,api.order.create)
    router.get('/order/:id', jwt.authenticateToken ,api.order.findOne)
    // router.put('/order/:id', api.order.update)
    // router.delete('/order/:id', jwt.authenticateToken ,api.order.destroy)

    // orderDetail
    // router.get('/order_detail', jwt.authenticateToken ,api.order_detail.findAll)
    // router.get('/order_detail/:id', jwt.authenticateToken ,api.order_detail.findOne)

    app.use('/api', router)
}