const mongoose = require('mongoose')
const BrandSchema = new mongoose.Schema({
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    name:{
        type: String,
        unique: true,
        required: 'Please enter brand name',
    },
    sports: [{
      type: String,
      enum: ['football', 'cricket'],
      required: true
    }],
    gender: [{
      type: String,
      enum: ['male', 'female'],
      required: true
    }],
    logo: {
      type: String,
      required: false
    },
    
})
const Brand = mongoose.model('Brand', BrandSchema)

module.exports = Brand