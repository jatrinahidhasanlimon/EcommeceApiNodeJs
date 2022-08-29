const express = require('express')
const router = express.Router()
const upload =  require('../middleware/upload.js'); 
const  { 
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../Controllers/CategoryController.js')

router.get('/', getCategories)
router.get('/:id', getCategory)
router.post('/', upload, createCategory) 
router.put('/:id', updateCategory) 
router.delete('/:id', deleteCategory)


module.exports = router