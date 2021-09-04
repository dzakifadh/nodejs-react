const express = require('express')
const router = express.Router()
const frontend = require('../controllers/frontend.controller')

router.get('/home-product', frontend.getHomeProduct)
router.get('/products', frontend.getProducts)
router.get('/product/:url', frontend.getProductDetail)

// Cart
router.get('/cart', frontend.getAllCart)
router.post('/cart', frontend.createCart)
router.put('/cart/:id', frontend.updateCart)
router.delete('/cart/:id', frontend.deleteCart)

router.post('/checkout', frontend.createCheckout)

module.exports = router