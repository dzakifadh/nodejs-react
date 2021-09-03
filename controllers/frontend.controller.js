const { nanoid } = require("nanoid")
const { convertToSlug } = require("../libs/handleFunction")
const db = require("../models/bundle.model")
const Op = db.Sequelize.Op

exports.getHomeProduct = async (req, res) => {
    db.product.findAll({ 
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

exports.getProducts = (req, res) => {
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

    db.product.findAll({
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

exports.getProductDetail = (req, res) => {
    const url = req.params.url
    db.product.findOne({
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