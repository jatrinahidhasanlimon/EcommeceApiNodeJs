const mongoose = require('mongoose')
const Club = require('./Club')

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
   
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Country',
    },
    club: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Club',
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
      price: {
        type: Number,
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
      availabliltyOptions:{
        sizeWise:{
          xs:{type: Number,  required: true },
          s:{type: Number, required: true },
          m:{type: Number,  required: true },
          l:{type: Number,  required: true },
          xl:{type: Number,  required: true },
          xxl:{type: Number,  required: true },
        },
        colorWise:{
          type: Object,
          required: true
        }
    }
      
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product