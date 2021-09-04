const db = require('../models/bundle.model')

exports.create = async (req, res) => {
    const data = {
        name: req.body.name
    }

    db.category.create(data)
    .then(result => {
        res.status(200).send({
            message: 'Category created successfully!',
            data: result
        })
    })
    .catch(error => {
        res.status(500).send({
            message: 'Can\'t created category!',
            data: error
        })
    })
}

exports.findAll = async (req, res) => {
    db.category.findAll()
    .then(result => {
        if (!result) {
            res.status(404).send({
                message: 'Category not found'
            })
        }
        res.status(200).send({
            data: result
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
    db.category.findOne({
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
        name: req.body.name
    }

    db.category.update(data, {
        where: {id}
    })
    .then(result => {
        if(result[0]){
            res.status(200).send({
                message: 'Category updated!',
            })
        }else{
            res.status(442).send({
                message: 'Fail to update category, incorrect request'
            })
        }
    })
    .catch(error => {
        res.status(500).send({
            message: 'Can\'t update category!',
            data: error
        })
    })
}

exports.delete = async (req, res) => {
    const id = req.params.id

    db.category.destroy({
        where: {id}
    })
    .then(result => {
        if(result){
            res.status(200).send({
                message: 'Category deleted!'
            })
        }else{
            res.status(404).send({
                message: 'Category ID doesn\'t exist!',
            })
        }
    })
    .catch(error => {
        res.status(500).send({
            message: 'Can\'t delete category!'
        })
    })
}