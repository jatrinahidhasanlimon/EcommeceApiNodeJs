const Product = require('../models/Product.js');
const mongoose = require('mongoose')
const getProducts = (async (req, res) => {
    try {
        const allUser = await Product.find();
        return res.status(200).json(allUser)
    } catch (error) {
       return res.status(400).json(error.message)
    }
})
const getProduct = (async (req, res) => {
    const userID = (req.params.id)
    if (!mongoose.Types.ObjectId.isValid(userID)) {
        return res.status(404).json({ msg: `user not found with id :${userID}`  });
    }
    try {
        let user = await Product.findById(userID);
        if (user === null) {
           return res.status(404).json({ msg: `user not found with id :${userID}`  });
        } 
        res.status(200).json(user)
    } catch (error) {
       return res.status(500).json(error.message) 
    }
})
const  createProduct = async (req, res) => {
    const newProduct = {...req.body}
    try {
        let create = await Product.create(newProduct)
        res.status(200).json(create)
    }catch(error){
        res.status(400).json(error.message)
    }
}
const updateProduct = ( async (req, res) => {
    const userID = (req.params.id)
    const filter = { _id: userID };
    if (!mongoose.Types.ObjectId.isValid(userID)) {
        return res.status(404).json({ msg: `user not found with id :${userID}`  });
    }
    const info = {...req.body}
    try {
        let doc = await Product.findOneAndUpdate(filter, info, {
            new: true
          });
          return res.status(200).json(doc) 
          
    } catch (error) {
       return res.status(500).json('From catch: '+error.message) 
    }
})

const deleteProduct = (async (req, res) => {
    const userID = (req.params.id)
    if (!mongoose.Types.ObjectId.isValid(userID)) {
        return res.status(404).json({ msg: `user not found with id :${userID}`  });
    }
    try {
        const deleteUser = await Product.findByIdAndRemove(userID);
        if(deleteUser == null){
            return res.status(404).json('Failed to find user by id: '+userID)
        }
        res.status(200).json('user deleted'+deleteUser)
        
        
    } catch (error) {
        console.log(error)
        res.status(400).json('Failed to delete. '+error.message)
    }
   
})

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}