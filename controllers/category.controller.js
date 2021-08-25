const db = require('../models/bundle.model')

exports.create = async (req, res) => {
    const data = {
        name: req.body.name
    }

    db.category.create(data)
    .then(result => {
        res.status(200).send({
            message: 'Data created successfully!',
            data: result
        })
    })
    .catch(error => {
        res.status(500).send({
            message: 'Can\'t created data!',
            data: error
        })
    })
}

exports.findAll = async (req, res) => {
    db.category.findAll()
    .then(result => {
        if (!result) {
            res.status(404).send({
                message: 'Data not found'
            })
        }
        res.status(200).send({
            message: result
        })
    })
    .catch(error => {})
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
                message: 'Data updated!',
            })
        }else{
            res.status(442).send({
                message: 'Fail to update data, incorrect request'
            })
        }
    })
    .catch(error => {
        res.status(500).send({
            message: 'Can\'t update data!',
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
        res.status(200).send({
            message: 'Data deleted!'
        })
    })
    .catch(error => {
        res.status(500).send({
            message: 'Can\'t delete data!'
        })
    })
}