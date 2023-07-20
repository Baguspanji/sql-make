const rajaongkirProvince = require("../models").rajaongkir_province;
const rajaongkirCity = require("../models").rajaongkir_city;
const rajaongkirSubdistrict = require("../models").rajaongkir_subdistrict;

const shipperProvince = require("../models").shipper_province;
const shipperCity = require("../models").shipper_city;
const shipperDistrict = require("../models").shipper_district;
const shipperSubdistrict = require("../models").shipper_subdistrict;

const province = require("../models").province;
const city = require("../models").city;
const district = require("../models").district;
const subdistrict = require("../models").subdistrict;

const axios = require('axios');
const { sequelize } = require("../models");

exports.getProvinceRajaongkir = async (req, res) => {
    const response = await axios.get('https://pro.rajaongkir.com/api/province', {
        headers: {
            key: '2e2c3ea85d428fa0742837d3b99a76d6'
        }
    })

    const data = response.data.rajaongkir.results

    const t = await sequelize.transaction();
    try {
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            await rajaongkirProvince.upsert({
                id: element.province_id,
                name: element.province
            }, { transaction: t })
        }
        await t.commit();

        res.json({
            message: 'Success'
        })
    } catch (error) {
        await t.rollback();

        res.json({
            message: 'Failed',
            error
        })
    }
};

exports.getCityRajaongkir = async (req, res) => {
    const provinces = await rajaongkirProvince.findAll()

    const t = await sequelize.transaction();

    try {
        for (let i = 0; i < provinces.length; i++) {
            const element = provinces[i];

            const response = await axios.get(`https://pro.rajaongkir.com/api/city?province=${element.id}`, {
                headers: {
                    key: '2e2c3ea85d428fa0742837d3b99a76d6'
                }
            })

            const data = response.data.rajaongkir.results

            for (let j = 0; j < data.length; j++) {
                const city = data[j];
                await rajaongkirCity.upsert({
                    id: city.city_id,
                    province_id: city.province_id,
                    name: city.city_name,
                    type: city.type,
                    postal_code: city.postal_code
                }, { transaction: t })
            }
        }

        await t.commit();

        res.json({
            message: 'Success'
        })
    } catch (error) {
        await t.rollback();

        res.json({
            message: 'Failed',
            error
        })
    }
};

exports.getSubdistrictRajaongkir = async (req, res) => {
    const page = req.query.page || 1
    const limit = req.query.limit || 100
    var offset = (page - 1) * limit
    const cities = await rajaongkirCity.findAll({
        offset: offset,
        limit: limit
    })

    const t = await sequelize.transaction();

    try {
        for (let i = 0; i < cities.length; i++) {
            const element = cities[i];

            const response = await axios.get(`https://pro.rajaongkir.com/api/subdistrict?city=${element.id}`, {
                headers: {
                    key: '2e2c3ea85d428fa0742837d3b99a76d6'
                }
            })

            const data = response.data.rajaongkir.results

            for (let j = 0; j < data.length; j++) {
                const subdistrict = data[j];
                await rajaongkirSubdistrict.upsert({
                    id: subdistrict.subdistrict_id,
                    city_id: subdistrict.city_id,
                    name: subdistrict.subdistrict_name
                }, { transaction: t })

            }
        }

        await t.commit();

        res.json({
            message: 'Success'
        })
    } catch (error) {
        await t.rollback();

        res.json({
            message: 'Failed',
            error
        })
    }
};

exports.getProvinceShipper = async (req, res) => {
    const response = await axios.get('https://merchant-api-sandbox.shipper.id/v3/location/country/228/provinces?limit=50', {
        headers: {
            Accept: 'application/json',
            'X-API-Key': 'tDmfzGFaG0wZCEgbF9O5308iHSkBkRS67nIjvlf1ifi7xvR9NDisOVg6YQpTZHUv'
        }
    })

    const data = response.data.data

    const t = await sequelize.transaction();

    try {
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            await shipperProvince.upsert({
                id: element.id,
                name: element.name,
                latitude: element.lat,
                longitude: element.lng
            }, { transaction: t })
        }
        await t.commit();

        res.json({
            message: 'Success'
        })
    } catch (error) {
        await t.rollback();

        res.json({
            message: 'Failed',
            error
        })
    }
};

exports.getCityShipper = async (req, res) => {
    const provinces = await shipperProvince.findAll()

    const t = await sequelize.transaction();

    try {
        for (let i = 0; i < provinces.length; i++) {
            const element = provinces[i];

            const response = await axios.get(`https://merchant-api-sandbox.shipper.id/v3/location/province/${element.id}/cities?limit=100`, {
                headers: {
                    Accept: 'application/json',
                    'X-API-Key': 'tDmfzGFaG0wZCEgbF9O5308iHSkBkRS67nIjvlf1ifi7xvR9NDisOVg6YQpTZHUv'
                }
            })

            const data = response.data.data

            for (let j = 0; j < data.length; j++) {
                const city = data[j];

                var name = city.name
                var type = ''
                if (name.includes('Kab.')) {
                    name = name.replace(', Kab.', '')
                    type = 'Kabupaten'
                } else if (name.includes('Kota')) {
                    name = name.replace(', Kota', '')
                    type = 'Kota'
                }

                await shipperCity.upsert({
                    id: city.id,
                    province_id: city.province.id,
                    name: name,
                    type: type,
                    latitude: city.lat,
                    longitude: city.lng
                }, { transaction: t })
            }
        }

        await t.commit();

        res.json({
            message: 'Success'
        })
    } catch (error) {
        await t.rollback();

        res.json({
            message: 'Failed',
            error
        })
    }
};

exports.getDistrictShipper = async (req, res) => {
    const cities = await shipperCity.findAll()

    const t = await sequelize.transaction();

    try {
        for (let i = 0; i < cities.length; i++) {
            const city = cities[i];

            const response = await axios.get(`https://merchant-api-sandbox.shipper.id/v3/location/city/${city.id}/suburbs?limit=100`, {
                headers: {
                    Accept: 'application/json',
                    'X-API-Key': 'tDmfzGFaG0wZCEgbF9O5308iHSkBkRS67nIjvlf1ifi7xvR9NDisOVg6YQpTZHUv'
                }
            })

            const data = response.data.data

            for (let j = 0; j < data.length; j++) {
                const district = data[j];

                await shipperDistrict.upsert({
                    id: district.id,
                    city_id: district.city.id,
                    name: district.name,
                    latitude: district.lat,
                    longitude: district.lng
                }, { transaction: t })
            }
        }

        await t.commit();

        res.json({
            message: 'Success'
        })
    } catch (error) {
        await t.rollback();

        res.json({
            message: 'Failed',
            error
        })
    }
};

exports.getSubdistrictShipper = async (req, res) => {
    const page = req.query.page || 1
    const limit = req.query.limit || 1000
    var offset = (page - 1) * limit

    const districts = await shipperDistrict.findAll({
        offset: offset,
        limit: limit
    })

    const t = await sequelize.transaction();

    try {
        for (let i = 0; i < districts.length; i++) {
            const district = districts[i];

            const response = await axios.get(`https://merchant-api-sandbox.shipper.id/v3/location/suburb/${district.id}/areas?limit=100`, {
                headers: {
                    Accept: 'application/json',
                    'X-API-Key': 'tDmfzGFaG0wZCEgbF9O5308iHSkBkRS67nIjvlf1ifi7xvR9NDisOVg6YQpTZHUv'
                }
            })

            const data = response.data.data

            for (let j = 0; j < data.length; j++) {
                const subdistrict = data[j];

                await shipperSubdistrict.upsert({
                    id: subdistrict.id,
                    district_id: subdistrict.suburb.id,
                    name: subdistrict.name,
                    latitude: subdistrict.lat,
                    longitude: subdistrict.lng,
                    postcode: subdistrict.postcode
                }, { transaction: t })
            }
        }

        await t.commit();

        res.json({
            message: 'Success'
        })
    } catch (error) {
        await t.rollback();

        res.json({
            message: 'Failed',
            error
        })
    }
};

exports.mappingProvince = async (req, res) => {
    const rajaongkir_province = await rajaongkirProvince.findAll()

    const t = await sequelize.transaction();

    try {
        for (let i = 0; i < rajaongkir_province.length; i++) {
            const element = rajaongkir_province[i];

            const shipper_province = await shipperProvince.findOne({
                where: {
                    name: element.name
                }
            })

            await province.upsert({
                id: element.id,
                name: element.name,
                shipper_id: shipper_province ? shipper_province.id : null,
                latitude: shipper_province ? shipper_province.latitude : null,
                longitude: shipper_province ? shipper_province.longitude : null
            }, { transaction: t })
        }

        await t.commit();

        res.json({
            message: 'Success'
        })
    } catch (error) {
        await t.rollback();

        res.json({
            message: 'Failed',
            error
        })
    }
}

exports.mappingCity = async (req, res) => {
    const rajaongkir_city = await rajaongkirCity.findAll()

    const t = await sequelize.transaction();

    try {
        for (let i = 0; i < rajaongkir_city.length; i++) {
            const element = rajaongkir_city[i];

            const shipper_city = await shipperCity.findOne({
                where: {
                    name: element.name
                }
            })

            var type = ''
            if (element.type == 'Kabupaten') {
                type = 'Kab.'
            } else if (element.type == 'Kota') {
                type = 'Kota'
            }

            await city.upsert({
                id: element.id,
                province_id: element.province_id,
                name: type + ' ' + element.name,
                shipper_id: shipper_city ? shipper_city.id : null,
                latitude: shipper_city ? shipper_city.latitude : null,
                longitude: shipper_city ? shipper_city.longitude : null,
                postal_code: element.postal_code
            }, { transaction: t })
        }

        await t.commit();

        res.json({
            message: 'Success'
        })
    } catch (error) {
        await t.rollback();

        res.json({
            message: 'Failed',
            error
        })
    }
}

exports.mappingDistrict = async (req, res) => {
    const rajaongkir_subdistrict = await rajaongkirSubdistrict.findAll()

    const t = await sequelize.transaction();

    try {
        for (let i = 0; i < rajaongkir_subdistrict.length; i++) {
            const element = rajaongkir_subdistrict[i];

            const shipper_district = await shipperDistrict.findOne({
                where: {
                    name: element.name
                }
            })

            await district.upsert({
                id: element.id,
                city_id: element.city_id,
                name: element.name,
                shipper_id: shipper_district ? shipper_district.id : null,
                latitude: shipper_district ? shipper_district.latitude : null,
                longitude: shipper_district ? shipper_district.longitude : null
            }, { transaction: t })
        }

        await t.commit();

        res.json({
            message: 'Success'
        })
    } catch (error) {
        await t.rollback();

        console.log(error)

        res.json({
            message: 'Failed',
            error
        })
    }
}

exports.mappingSubdistrict = async (req, res) => {
    const shipper_subdistrict = await shipperSubdistrict.findAll()

    const t = await sequelize.transaction();

    try {
        for (let i = 0; i < shipper_subdistrict.length; i++) {
            const element = shipper_subdistrict[i];

            const district_data = await district.findOne({
                where: {
                    shipper_id: element.district_id
                }
            })

            await subdistrict.upsert({
                id: element.id,
                district_id: district_data ? district_data.id : null,
                name: element.name,
                shipper_id: element.id,
                latitude: element.latitude,
                longitude: element.longitude,
                postcode: element.postcode
            }, { transaction: t })
        }

        await t.commit();

        res.json({
            message: 'Success'
        })
    } catch (error) {
        await t.rollback();

        res.json({
            message: 'Failed',
            error
        })
    }
}

exports.searchByLatLong = async (req, res) => {
    let { lat, lng, id } = req.body

    lat = parseFloat(lat)
    lng = parseFloat(lng)

    // const data = await shipperSubdistrict.findOne({
    //     where: {
    //         // id: id
    //         latitude: lat,
    //         longitude: lng
    //     },
    //     include: [
    //         {
    //             model: shipperDistrict,
    //             include: [
    //                 {
    //                     model: shipperCity,
    //                     include: [
    //                         {
    //                             model: shipperProvince
    //                         }
    //                     ]
    //                 }
    //             ]
    //         }
    //     ]
    // })

    const data = await sequelize.query(`
        SELECT
            v.id,
            v.name,
            v.latitude,
            v.longitude,
            d.id AS district_id,
            d.name AS district_name,
            c.id AS city_id,
            c.name AS city_name,
            p.id AS province_id,
            p.name AS province_name,
            ST_DISTANCE(POINT(${lng}, ${lat}), POINT(v.longitude, v.latitude)) AS distance
        FROM
            shipper_subdistricts v
        JOIN
            shipper_districts d ON d.id = v.district_id
        JOIN
            shipper_cities c ON c.id = d.city_id
        JOIN
            shipper_provinces p ON p.id = c.province_id
        ORDER BY
            distance
        LIMIT 1;
    `, { type: sequelize.QueryTypes.SELECT })

    res.json({
        data
    })
};

