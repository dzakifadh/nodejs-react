const express = require('express')
const path = require('path')
const app = express()
const db = require('./models/bundle.model')

app.use(express.json())

try {
    db.sequelize.sync({force: false})
} catch (error) {
    
}

const productRouter = require('./routes/product')
app.use('/product', productRouter)

module.exports = app