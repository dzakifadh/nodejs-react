const { nanoid } = require("nanoid")
const { convertToSlug } = require("../libs/handleFunction")
const db = require("../models/bundle.model")
const Op = db.Sequelize.Op

exports.getHomeProduct = async (req, res) => {
    await db.product.findAll({ 
        limit: 8,
        attributes: ['id', 'title', 'image', 'price', 'url']
    })
        .then(result => {
            if (result.length > 0) {
                res.status(200).send({
                    message: 'Ok',
                    data: result
                })
            } else {
                res.status(404).send({
                    message: 'Data isn\'t available'
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error find data : ${err}`
            })
        })
}

exports.getProducts = async (req, res) => {
    let keyword = ''
    const condition = []

    if (req.query.keyword) {
        keyword = req.query.keyword
        condition.push(
            {
                title: { [Op.like]: `%${keyword}%`}
            }
        )
    }

    await db.product.findAll({
        where: condition,
        attributes: ['id', 'title', 'image', 'price', 'url']
    })
        .then(result => {
            if (result.length > 0) {
                res.status(200).send({
                    message: 'Ok',
                    data: result
                })
            } else {
                res.status(404).send({
                    message: `Nothing keyword is match '${keyword}'`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error find data : ${err}`
            })
        })
}

exports.getProductDetail = async (req, res) => {
    const url = req.params.url
    await db.product.findOne({
        where: {url},
        attributes: ['id', 'title', 'description','full_description', 'price', 'image', 'price', 'url', 'createdAt'],
        include: [
            {
                model : db.category,
                attributes: ['name']
            }
        ]
    })
    .then(result => {
        if (result) {
            res.status(200).send({
                massage: 'Ok',
                data: result
            })
        }else{
            res.status(404).send({
                massage: 'Product Not Found',
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            massage: err,
        })
    })
}

exports.getAllCart = async (req, res) => {
    const session_id = req.query.session_id
    await db.cart.findAll({
        where: {session_id},
        attributes : ['id', 'qty', 'session_id', 'createdAt'],
        include: [{
            model: db.product,
            attributes : ['id', 'title', 'image', 'price', 'url']
        }]
    })
    .then(result => {
        if(result.length > 0){
            res.status(200).send({
                data: result
            })
        }else{
            res.status(404).send({
                message: 'Cart is empty'
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err
        })
    })
}

exports.createCart = async (req, res) => {

    const checkExistingProductInCart = await db.cart.findOne({
        where : [
            {product_id : req.body.product_id},
            {session_id : req.body.session_id},
        ]
    })

    if (checkExistingProductInCart !== null) {
        const updateQty = {
            qty: req.body.qty + checkExistingProductInCart.qty
        }

        await db.cart.update(updateQty, {
            where: {id : checkExistingProductInCart.id}
        })
        .then(() => {
            res.status(200).send({
                message: 'Qty updated'
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err
            })
        })
    }else{
        const data = {
            product_id : req.body.product_id,
            session_id : req.body.session_id,
            qty : req.body.qty
        }
    
        await db.cart.create(data)
        .then(result => {
            if (result) {
                res.status(200).send({
                    data: result
                })
            }else{
                res.status(404).send({
                    message: 'Error to create data'
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err
            })
        })
    }

}

exports.updateCart = async (req, res) => {
    let qty = req.body.qty
    const id = req.params.id
    await db.cart.update({qty}, {
        where: {id}
    })
    .then(result => {
        if (result.length > 0) {
            res.status(200).send({
                message: 'Cart updated!'
            })
        }else{
            res.status(404).send({
                data: result,
                meesage: 'Cart id doesn\'t exist'
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: `Something wrong with input data : ${err}`
        })
    })
}
exports.deleteCart = async (req, res) => {
    const id = req.params.id
    await db.cart.destroy({where: {id}})
    .then(result => {
        res.status(200).send({
            message: 'Cart deleted!'
        })
    })
    .catch(err => {
        res.status(500).send({
            message: err
        })
    })
}
exports.createCheckout = async (req, res) => {
    const session_id = req.query.session_id
    const data = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        address: req.body.address,
        telp: req.body.telp,
    }

    const cartData = await db.cart.findAll({
        where: {session_id}
    })

    if (cartData.length > 0) {
        const transaction_number = `TRS-${Date.now()}`
        const transaction_id = nanoid()

        const dataTransaction = {
            id: transaction_id,
            transaction_number
        }

        await db.transaction.create(dataTransaction)

        await cartData.map((item, index) => {
            const dataTransactionDetail = {
                qty: item.qty,
                product_id: item.product_id,
                transaction_id: transaction_id
            }

            db.transaction_detail.create(dataTransactionDetail)
            db.cart.destroy({where: {id: item.id}})
        })

        await db.customer.create(data)

        await res.status(200).send({
            message: 'Checkout successfully!'
        })
    }
    await res.status(404).send({
        message: 'Cart data is empty!'
    })
}