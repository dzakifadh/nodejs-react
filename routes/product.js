const express = require('express')
const router = express.Router()
const product = require('../controllers/product.controller')
const handleFileUpload = require('../libs/handleFileUpload')

/* Product */
router.get('/', product.findAll)
router.post('/', handleFileUpload.single('image'), product.create)

module.exports = router