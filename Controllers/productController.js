const Product = require('../models/Product.js');
const mongoose = require('mongoose')
const getProducts = (async (req, res) => {
    try {
        const allproduct = await Product.find();
        return res.status(200).json(allproduct)
    } catch (error) {
        return res.status(400).json(validationErrorHumanify(error))
    }
})
const getProduct = (async (req, res) => {
    const productID = (req.params.id)
    if (!mongoose.Types.ObjectId.isValid(productID)) {
        return res.status(404).json({ msg: `product not found with id :${productID}`  });
    }
    try {
        let product = await Product.findById(productID);
        if (product === null) {
           return res.status(404).json({ msg: `product not found with id :${productID}`  });
        } 
        res.status(200).json(product)
    } catch (error) {
        return res.status(400).json(validationErrorHumanify(error))
    }
})
const  createProduct = async (req, res) => {
    const newProduct = {...req.body}
    try {
        let create = await Product.create(newProduct)
        res.status(200).json(create)
    }catch(error){
        return res.status(400).json(validationErrorHumanify(error))
    }
}
const updateProduct = ( async (req, res) => {
    const productID = (req.params.id)
    const filter = { _id: productID };
    if (!mongoose.Types.ObjectId.isValid(productID)) {
        return res.status(404).json({ msg: `product not found with id :${productID}`  });
    }
    const info = {...req.body}
    try {
        let doc = await Product.findOneAndUpdate(filter, info, {
            new: true
          });
          if (doc === null) {
            return res.status(404).json({ msg: `product not found with id :${productID}`  });
         }
          return res.status(200).json(doc) 
          
    } catch (error) {
        return res.status(400).json(validationErrorHumanify(error))
    }
})

const deleteProduct = (async (req, res) => {
    let rMessage = {}
    const productID = (req.params.id)
    if (!mongoose.Types.ObjectId.isValid(productID)) {
        return res.status(404).json({ msg: `product not found with id :${productID}`  });
    }
    try {
        const deleteproduct = await Product.findByIdAndRemove(productID);
        if(deleteproduct == null){
            return res.status(404).json('Failed to find product by id: '+productID)
        }
        rMessage['msg'] = 'product deleted'
        rMessage['data'] = deleteproduct
        res.status(200).json(rMessage)
    } catch (error) {
        console.log(error)
        return res.status(400).json(validationErrorHumanify(error))
    }
   
})

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}