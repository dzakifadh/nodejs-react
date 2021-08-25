const express = require('express')
const router = express.Router()
const category = require('../controllers/category.controller')

/* Category */
router.get('/', category.findAll)
router.post('/', category.create)
router.put('/:id', category.update)
router.delete('/:id', category.delete)

module.exports = router