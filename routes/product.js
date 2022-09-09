const express = require('express')
const router = express.Router()
const upload =  require('../middleware/upload.js'); 
const  { 
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductbySlug
} = require('../Controllers/ProductController.js')

router.get('/', getProducts)
router.get('/:id', getProduct)
router.get('/product-by-slug/:slug', getProductbySlug)
router.post('/',  upload ,createProduct) 

router.post("/upload_files", (req, res) => {
    // You can save the image you have get.
    upload(req, res, (err) => {
     if (err) {
      return res.json({ success: false, err });
     }
     return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
     });
    });
   });



router.put('/:id', updateProduct) 
router.delete('/:id', deleteProduct)


module.exports = router