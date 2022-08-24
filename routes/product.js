const express = require('express')
const upload =  require('../middleware/upload.js'); 
const router = express.Router()
const  { 
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../Controllers/ProductController.js')

router.get('/', getProducts)
router.get('/:id', getProduct)
router.post('/',  upload ,createProduct) 
router.put('/:id', updateProduct) 
router.delete('/:id', deleteProduct)


module.exports = router