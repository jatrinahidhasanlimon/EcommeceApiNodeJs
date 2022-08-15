const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    name:{
        type: String,
        required: true,
        maxLength:  [54, 'Maximum 54, got {VALUE}'],
    },
   
    category_id: {
        type: String,
        required: true
    },
    image: {
      type: String,
      required: true
  },
    tags: [{
        type: String
    }],
    sku: {
      type: String,
      required: true
    },
    options:{
      size:{
        h:{type: Number,  required: true },
        l:{type: Number, required: true },
        w:{type: Number,  required: true }
      },
      colors: [{type: String, required: true  }]
    },
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
      
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product