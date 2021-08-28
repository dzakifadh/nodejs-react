const Joi = require("joi");

const schema = {
    create : Joi.object({
        name: Joi.string().max(20).required()
    })
}

module.exports = schema