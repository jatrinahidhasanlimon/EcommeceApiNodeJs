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
    image:{
        type: String,
        unique: true
    },
    category_id: {
        type: String,
        required: true
      },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
      },
      address: {
        type: String,
        minLength: [4, 'Must be at least 4, got {VALUE}'],
        maxLength: 52,
        required: true
      },
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product