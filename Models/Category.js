const mongoose = require('mongoose')
const CategorySchema = new mongoose.Schema({
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    name: {
        type: String,
        required: true
    },
    image: {
      type: String,
      required: false
    },
  
    
})

const Category = mongoose.model('Category', CategorySchema)

module.exports = Category