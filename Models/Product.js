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
        required: true,
        ref: 'Category',
    },
    country: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Country',
    },
    club:{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Club',
    },
    brand:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Brand',
    },
      thumbnail: {
        type: String,
        required: true
    },
    tags: [{
          type: String
      }],
    images: [{
        type: Object,
        // required: true
    }],
    sku: {
        type: String,
        required: true
      },
    sellingPrice: {
        type: Number,
        required: true
    },
    erp: {
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
    description:{
      type: String,
      required: true,
      maxLength:  [14, 'Maximum 13, got {VALUE}'],
  },
    kitType: {
      type     : String,
      enum: ['home', 'away', 'training_kit', 'goal_keeper','travelling_kit' ],
      required : true,
  },
  gender: {
    type : String,
    enum: ['male', 'female'],
    required : true,
},
  
   
      
})
ProductSchema.plugin(uniqueValidator);

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product