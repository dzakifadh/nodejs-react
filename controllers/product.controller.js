const { nanoid } = require("nanoid")
const { convertToSlug } = require("../libs/handleFunction")
const db = require("../models/bundle.model")

exports.create = async (req, res) => {
    const data = {
        id: nanoid(),
        title: req.body.title,
        description: req.body.description,
        full_description: req.body.full_description,
        price: req.body.price,
        image: req.body.image,
        url: convertToSlug(`${req.body.title}`),
        category_id: req.body.category_id,
    }

    db.product.create(data)
    .then(result => {
        res.status(200).send({
            message: 'Product created successfully!',
            data: result
        })
    })
    .catch(error => {
        res.status(500).send({
            message: 'Can\'t created product!',
            data: error
        })
    })
}

exports.findAll = async (req, res) => {
    db.product.findAll()
    .then(result => {
        if (!result) {
            res.status(404).send({
                message: 'Product not found'
            })
        }
        res.status(200).send({
            data: result,
        })
    })
    .catch(error => {
        res.status(500).send({
            message: error
        })
    })
}

exports.findOne = async (req, res) => {
    const id = req.params.id
    db.product.findOne({
        where: {id}
    })
    .then(result => {
        res.status(200).send({
            data: result
        })
    })
    .catch(error => {
        res.status(404).send({
            data: error
        })
    })
}

exports.update = async (req, res) => {
    const id = req.params.id
    const data = {
        title: req.body.title,
        description: req.body.description,
        full_description: req.body.full_description,
        price: req.body.price,
        category_id: req.body.category_id,
    }


    if (req.file != undefined) {
        data['image'] = req.file.filename
    }

    db.product.update(data, {
        where: {id}
    })
    .then(result => {
        res.status(200).send({
            message: 'Product updated!',
            data: result,
        })
    })
    .catch(error => {
        res.status(500).send({
            message: 'Fail to update product',
        })
    })
}

exports.delete = async (req, res) => {
    const id = req.params.id

    db.product.destroy({
        where: {id}
    })
    .then(result => {
        res.status(200).send({
            message: 'Product deleted!',
        })
    })
    .catch(error => {
        res.status(500).send({
            message: 'Fail to delete product',
        })
    })
}