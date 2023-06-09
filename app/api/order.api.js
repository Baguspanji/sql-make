const Order = require('../models').order;
const OrderDetail = require('../models').order_detail;

const Item = require('../models').item;

exports.findAll = async (req, res) => {
    try {
        const order = await Order
            .findAll({
                where: {
                    user_id: req.user.id
                },
                include: [
                    OrderDetail
                ],
                attributes: ['id', 'total_amount']
            })

        res.status(200).send({
            status: true,
            message: 'item succesfully',
            data: order
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

exports.create = async (req, res) => {
    const body = req.body

    var createItems = []
    var total_amount = 0
    for (item of body.items) {
        const findItem = await Item.findOne({
            where: {
                id: item.item_id
            }
        })

        if (findItem === null) {
            return res.status(400).send({
                status: false,
                message: 'item not found',
                data: null
            })
        }

        const total = findItem.price * item.qty
        total_amount += total

        createItems.push({
            item_id: item.item_id,
            qty: item.qty,
            total: total
        })
    }

    try {
        const createOrder = {
            user_id: req.user.id,
            total_amount: total_amount
        }

        const order = await Order.create(createOrder)

        var itemOrders = []
        for (item of createItems) {
            const order_detail = await OrderDetail
                .create({
                    item_id: item.item_id,
                    order_id: order.id,
                    qty: item.qty,
                    total: item.total
                })

            itemOrders.push({
                id: order_detail.id,
                item_id: order_detail.item_id,
                order_id: order_detail.order_id,
                qty: order_detail.qty,
                total: order_detail.total
            })
        }

        order.dataValues.order_details = itemOrders
        res.status(200).send({
            status: true,
            message: 'item succesfully',
            data: order
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
        const order = await Order
            .findOne({
                where: {
                    id: req.params.id,
                    user_id: req.user.id
                },
                include: [
                    OrderDetail
                ],
                attributes: ['id', 'total_amount']
            })

        res.status(200).send({
            status: true,
            message: 'item succesfully',
            data: order
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
