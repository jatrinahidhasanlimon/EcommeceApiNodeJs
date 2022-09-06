const Brand = require('../models/Brand.js');
const mongoose = require('mongoose')
const upload =  require('../middleware/upload.js'); 

const { validationErrorHumanify } = require('../models/ErrorHandler.js');
const getBrands = (async (req, res) => {
    try {
        const allBrand = await Brand.find();
        return res.status(200).json(allBrand)
    } catch (error) {
        return res.status(400).json(validationErrorHumanify(error))
    }
})
const getBrand = (async (req, res) => {
    const brandID = (req.params.id)
    if (!mongoose.Types.ObjectId.isValid(brandID)) {
        return res.status(404).json({ msg: `Brand not found with id :${brandID}`  });
    }
    try {
        let brand = await Brand.findById(brandID);
        if (brand === null) {
           return res.status(404).json({ msg: `Brand not found with id :${brandID}`  });
        } 
        return res.status(200).json(brand)
    } catch (error) {
        return res.status(400).json(validationErrorHumanify(error))
    }
})
const  createBrand = async (req, res) => {
    const newBrand = {...req.body}
    console.log('passed parameter is: ', JSON.stringify (req.body) )
    try {
        let create = await Brand.create(newBrand)
        // let uploadImage =  upload(req, res);
        res.status(200).json(create)
    }catch(error){
        return res.status(400).json(validationErrorHumanify(error))
    }
}
const updateBrand = ( async (req, res) => {
    const brandID = (req.params.id)
    const filter = { _id: brandID };
    if (!mongoose.Types.ObjectId.isValid(brandID)) {
        return res.status(404).json({ msg: `Brand not found with id :${brandID}`  });
    }
    const info = {...req.body}
    try {
        let brand = await Brand.findOneAndUpdate(filter, info, {
            new: true
          });
          if (brand === null) {
            return res.status(404).json({ msg: `Brand not found with id :${brandID}`  });
         }
          return res.status(200).json(brand) 
          
    } catch (error) {
        return res.status(400).json(validationErrorHumanify(error))
    }
})

const deleteBrand = (async (req, res) => {
    let rMessage = {}
    const brandID = (req.params.id)
    if (!mongoose.Types.ObjectId.isValid(brandID)) {
        return res.status(404).json({ msg: `Brand not found with id :${brandID}`  });
    }
    try {
        const deleteBrand = await Brand.findByIdAndRemove(brandID);
        if(deleteBrand == null){
            return res.status(404).json('Failed to find brand by id: '+brandID)
        }
        rMessage['msg'] = 'brand deleted'
        rMessage['data'] = deleteBrand
        res.status(200).json(rMessage)
    } catch (error) {
        console.log(error)
        return res.status(400).json(validationErrorHumanify(error))
    }
   
})

module.exports = {
    getBrands,
    getBrand,
    createBrand,
    updateBrand,
    deleteBrand
}