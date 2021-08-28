const schema = require("./product.schema")

module.exports = {
    createProduct: async (req, res, next) => {
        const {error, value} = schema.create.validate(req.body)
        if (error) {
            res.status(422).send({
                success: false,
                message: error.details[0].message
            })
        }else{
            next()
        }
    }
}