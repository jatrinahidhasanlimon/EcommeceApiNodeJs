const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');


const ProductSchema = new mongoose.Schema({
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    name:{
        type: String,
        unique: true,
        required: true,
        maxLength:  [54, 'Maximum 54, got {VALUE}'],
    },
    slug:{
      type: String,
      unique: true,
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
    club:{
      type: Object,
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
          type: Object,
          required: true
        },
    },
    colors:[{
      type: String,
      required: true,
      maxLength:  [14, 'Maximum 13, got {VALUE}'],
  }],
    kitType: [{
      type: String,
      enum: ['home', 'away', 'training_kit', 'goal_keeper','travelling_kit' ],
      required: true
  }]
   
      
})
ProductSchema.plugin(uniqueValidator);

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product