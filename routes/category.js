const express = require('express')
const router = express.Router()
const category = require('../controllers/category.controller')
const { createCategory } = require('../validation/category/category.validation')

/* Category */
router.get('/', category.findAll)
router.get('/:id', category.findOne)
router.post('/', createCategory, category.create)
router.put('/:id', createCategory, category.update)
router.delete('/:id', category.delete)

module.exports = router