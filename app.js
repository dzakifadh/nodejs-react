const { urlencoded } = require('express')
const express = require('express')
const path = require('path')
const app = express()
const db = require('./models/bundle.model')

app.use('/assets/images', express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(urlencoded({ extended: false }))

try {
    db.sequelize.sync({ force: false })
} catch (error) {

}
/* Product */
const productRouter = require('./routes/product')
app.use('/product', productRouter)

/* Category */
const categoryRouter = require('./routes/category')
app.use('/category', categoryRouter)

module.exports = app