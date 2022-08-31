const Product = require('../models/Product.js');
const mongoose = require('mongoose')

const {validationErrorHumanify} = require('../models/ErrorHandler.js');
const {underscoreToArrayofObjectIdSplit, underscoreToArrayLoweCaseSplit} = require('../models/customFunction.js');

const getProducts = (async (req, res) => {
    let query = {}
    let lookup = {}
    let unwind = ''
    let matchString = {}
    let countrySeg = {}
    
    if(req.query.club)
    {
        let clubParams = underscoreToArrayofObjectIdSplit(req.query.club)
        console.log(clubParams)
        if (clubParams && clubParams.length > 0) {
            query.club = {$in : clubParams};
        }
    }
    if(req.query.country)
    {
        let countryParams = underscoreToArrayLoweCaseSplit(req.query.country)
        console.log('params are',countryParams)
        // if (countryParams && countryParams.length > 0) {
        //     query.sample = {$in : countryParams};
        // console.log('inside country ')
        // }
    //    const qDemo = await  Product.aggregate([
         lookup = {
            from: 'countries',
            localField: 'country',
            foreignField: '_id',
            as: 'Country'
        }

        let unwind =  '$Country'
        let matchString =  {
                'Country.name' : new RegExp('\spain\*')
            }
        
             countrySeg = 
                [
                // $match: { 'Country.name' : new RegExp('\spain\*')}
                    {
                        $lookup: {
                            from: 'countries',
                            localField: 'country',
                            foreignField: '_id',
                            as: 'Country'
                        },
                    },
                    {
                        $lookup: {
                            from: 'clubs',
                            localField: 'club',
                            foreignField: '_id',
                            as: 'Club'
                        },
                    },
                    {
                        $unwind: '$Club',

                    },
                    {
                        $unwind: '$Country',

                    },
                    {
                        $match: { 
                            $and : [
                                    {
                                        $or: [
                                            
                                        {
                                            'Club._id' : {
                                                $in: [
                                                        mongoose.Types.ObjectId('630b4f3208e80aab62e20ffe'),
                                                        mongoose.Types.ObjectId('630b4f1408e80aab62e20ffc')
                                                ]    
                                                }
                                        },
                                        {
                                            'Country._id' : {
                                                $in: [
                                                        mongoose.Types.ObjectId('630b4f3208e80aab62e20ffe'),
                                                        mongoose.Types.ObjectId('630b4f1408e80aab62e20ffc')
                                                ]    
                                                }
                                        },
                                    
                                   
                                    ]
                                
                                } 
                            ]
                        }
                    },


//club 


                    
                   
            ]

    
        
        
        // return res.send(qDemo)

    }
    
    try {
     
        // const products = await Product.find(query);

       const  products = await  Product.aggregate( countrySeg )




        if (products === null) {
           return res.status(404).json({ msg: 'product not found'  });
        } 
        return res.status(200).json(products)
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
        return res.status(200).json(product)
    } catch (error) {
        return res.status(400).json(validationErrorHumanify(error))
    }
})

const  createProduct = async (req, res) => {
    const newProduct = {...req.body}
    // return res.send(newProduct)
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