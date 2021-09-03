const express = require('express')
const router = express.Router()
const frontend = require('../controllers/frontend.controller')

router.get('/home-product', frontend.getHomeProduct)
router.get('/products', frontend.getProducts)
router.get('/product/:url', frontend.getProductDetail)

module.exports = router