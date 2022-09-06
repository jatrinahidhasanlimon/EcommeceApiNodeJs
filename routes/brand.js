const express = require('express')
const router = express.Router()
const upload =  require('../middleware/upload.js'); 
const  { 
    getBrands,
    getBrand,
    createBrand,
    updateBrand,
    deleteBrand
} = require('../Controllers/BrandController.js')

router.get('/', getBrands)
router.get('/:id', getBrand)
router.post('/',upload, createBrand) 
router.put('/:id', updateBrand) 
router.delete('/:id', deleteBrand)


module.exports = router