const router = require('express').Router()
const api = require('../api')

module.exports = (app) =>{

    // User
    router.get('/province-rajaongkir', api.location.getProvinceRajaongkir)
    router.get('/city-rajaongkir', api.location.getCityRajaongkir)
    router.get('/subdistrict-rajaongkir', api.location.getSubdistrictRajaongkir)

    router.get('/province-shipper', api.location.getProvinceShipper)
    router.get('/city-shipper', api.location.getCityShipper)
    router.get('/district-shipper', api.location.getDistrictShipper)
    router.get('/subdistrict-shipper', api.location.getSubdistrictShipper)

    router.get('/province-mapping', api.location.mappingProvince)
    router.get('/city-mapping', api.location.mappingCity)
    router.get('/district-mapping', api.location.mappingDistrict)
    router.get('/subdistrict-mapping', api.location.mappingSubdistrict)

    router.post('/search', api.location.searchByLatLong)

    app.use('/api', router)
}