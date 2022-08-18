const mongoose = require('mongoose')


const CountrySchema = new mongoose.Schema({
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    name:{
        type: String,
        required: true
    },
    sports: [{
      type: String,
      enum: ['Football', 'Cricket'],
      required: true
  }]
    
})

const Country = mongoose.model('Country', CountrySchema)

module.exports = Country