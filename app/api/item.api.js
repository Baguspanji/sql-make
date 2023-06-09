const {
    getPagination
} = require('../utils/pagination');

const Item = require('../models').item;
const Op = require('sequelize').Op

exports.findAll = async (req, res) => {
    const keyword = req.query.keyword || ''
    const page = req.query.page || 1
    const limit = req.query.limit || 10

    const query = {
        where: {
            name: {
                [Op.like]: `%${keyword}%`
            }
        },
        attributes: ['id', 'name', 'price', 'strike_price', 'image']
    }

    try {
        const totalItems = await Item.count(query)

        query.limit = limit ? +limit : 10
        query.offset = (page - 1) * limit
        const item = await Item.findAll(query)

        res.status(200).send({
            status: true,
            message: 'item succesfully',
            data: getPagination(item, page, limit, totalItems)
        })
    } catch (error) {
        res.status(500).send({
            status: false,
            message: 'error',
            data: null,
            errors: error
        })
    }
}

exports.findOne = async (req, res) => {
    try {
        const item = await Item
            .findOne({
                where: {
                    id: req.params.id
                },
                attributes: ['id', 'name', 'price', 'strike_price', 'image']
            })

        res.status(200).send({
            status: true,
            message: 'item succesfully',
            data: item
        })
    } catch (error) {
        res.status(500).send({
            status: false,
            message: 'error',
            data: null,
            errors: error
        })
    }
}