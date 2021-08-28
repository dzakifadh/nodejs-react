const express = require('express')
const router = express.Router()
const product = require('../controllers/product.controller')
const handleFileUpload = require('../libs/handleFileUpload')
const { createProduct } = require('../validation/product/product.validation')

/* Product */
router.get('/', product.findAll)
router.get('/:id', product.findOne)
router.post('/', handleFileUpload.single('image'), createProduct, product.create)
router.put('/:id', handleFileUpload.single('image'), createProduct, product.update)
router.delete('/:id', product.delete)

module.exports = router