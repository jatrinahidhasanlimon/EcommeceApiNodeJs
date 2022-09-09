const Product = require('../models/Product.js');
const mongoose = require('mongoose')
const fs = require('fs');
const {validationErrorHumanify} = require('../models/ErrorHandler.js');
const {underscoreToArrayofObjectIdSplit,
     underscoreToArrayLoweCaseSplit,
     hyphenToArrayLoweCaseSplit,
     writeFileUsingBufferStream, 
     makeDirectory,
     streamToBuffer
    } = require('../models/customFunction.js');

const getProducts = (async (req, res) => {
    let sortParameter = { name: -1 }
    let aggregatePipeLineQuery = []
    
    if(req.query.club)
    {
        let clubParamsArr = underscoreToArrayLoweCaseSplit(req.query.club)
        // console.log('club params are',clubParamsArr)
        aggregatePipeLineQuery.push({ $lookup: { from: 'clubs', localField: 'club',foreignField: '_id', as: 'Club'} },
        {   $unwind: {path: '$Club', preserveNullAndEmptyArrays: false} },
        {   $match: {'Club.name' : {$in: clubParamsArr  } }}  )
        
    }
    if(req.query.country)
    {
        let countryParamsArr = underscoreToArrayLoweCaseSplit(req.query.country)
        // console.log('country params are',countryParamsArr)
        aggregatePipeLineQuery.push({ $lookup: { from: 'countries',  localField: 'country',  foreignField: '_id', as: 'Country'  }},
            {  $unwind: {path: '$Country', preserveNullAndEmptyArrays: false}}, 
            {  $match: {'Country.name' : {$in: countryParamsArr  } }} )

    }
    
    if(req.query.sortBy && typeof  req.query.sortBy === 'string'){
        let sortByParamsArr = hyphenToArrayLoweCaseSplit(req.query.sortBy)
        console.log('sort params array are:',sortByParamsArr)
        sortParameter = {}
        sortParameter[sortByParamsArr[0]] = sortByParamsArr[1] == 'asc'  ? 1 : -1
        console.log('sort parametrs:',sortByParamsArr[0])
    }
    aggregatePipeLineQuery.push({ $sort: sortParameter })
    
    try {
        console.log('demo is: ',aggregatePipeLineQuery)
       const  products = await  Product.aggregate( aggregatePipeLineQuery )
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
const getProductbySlug = (async (req, res) => {
    const productSlug = (req.params.slug)
    // if (!mongoose.Types.ObjectId.isValid(productSlug)) {
    //     return res.status(404).json({ msg: `product not found with id :${productSlug}`  });
    // }
    try {
        let product = await Product.findOne({slug: productSlug}).populate('club','name').populate('country','name').exec();
        if (product === null) {
           return res.status(404).json({ msg: `product not found with id :${productSlug}`  });
        } 
        return res.status(200).json(product)
    } catch (error) {
        return res.status(400).json(validationErrorHumanify(error))
    }
})

const  createProduct = async (req, res) => {
    const newProduct = {...req.body}
    const requestedFiles = req.files
    let imagesWithDescription = []; // For Storing images with description
    const uploadDir = makeDirectory('uploads/product/')
    if(requestedFiles){
        if(requestedFiles.thumbnail){
            const thumbnailFile =  requestedFiles.thumbnail[0]
            const tempFilePath = thumbnailFile.path;
            const targetPath = uploadDir + thumbnailFile.filename;
            const readStream = fs.createReadStream(tempFilePath);
            const bufferedFromStream = await streamToBuffer(readStream)
            writeFileUsingBufferStream (targetPath, bufferedFromStream, tempFilePath)
            newProduct['thumbnail'] = thumbnailFile.filename
        }
        if(requestedFiles.images){
            let imageOrder = 0;
            while( imageOrder <  requestedFiles.images.length){
                imagesWithDescription.push({
                    'image' : requestedFiles.images[imageOrder].filename,
                    'property' : req.body.imageDescription[imageOrder]
                })
                imageOrder++ ;
            }
            console.log('length of images Are: ', imagesWithDescription)
        }
        newProduct['images'] = imagesWithDescription
    }
    try {
        let create = await Product.create(newProduct)
        
        if(requestedFiles.images){
            const requestedfileImages = requestedFiles.images
            let imageOrder = 0;
            while( imageOrder <  requestedfileImages.length){
                const singleImageFile =  requestedfileImages[imageOrder]
                const tempFilePath = singleImageFile.path;
                const targetPath = uploadDir + singleImageFile.filename;
                const readStream = fs.createReadStream(tempFilePath);
                const bufferedFromStream = await streamToBuffer(readStream)
                writeFileUsingBufferStream (targetPath, bufferedFromStream, tempFilePath)
                imageOrder++
            }
        }

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
    deleteProduct,
    getProductbySlug
}