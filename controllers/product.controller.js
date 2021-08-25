const { nanoid } = require("nanoid")

exports.create = async (req, res) => {
    const data = {
        id: nanoid(),
        title: req.body.title,
        description: req.body.description,
        full_description: req.body.full_description,
        price: req.body.price,
        image: req.body.image,
        category_id: req.body.category_id,
    }

    res.send({
        message: 'Created 200 Ok',
        data
    })
}

exports.findAll = async (req, res) => {
    res.send({
        message: 'Find all 200 Ok'
    })
}