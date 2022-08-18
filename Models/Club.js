const mongoose = require('mongoose')


const ClubSchema = new mongoose.Schema({
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
  }],
    gender: [{
      type: String,
      enum: ['Male', 'Female'],
      required: true
  }],
  CountryId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
    
})

const Club = mongoose.model('Club', ClubSchema)

module.exports = Club