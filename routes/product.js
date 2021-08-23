const express = require('express')
const router = express.Router()
const product = require('../controllers/product.controller')

router.get('/', product.findAll)
router.post('/', product.create)

module.exports = router