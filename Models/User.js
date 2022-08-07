const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    // _id: mongoose.SchemaTypes.ObjectId,
    _id: {
      type: mongoose.Schema.Types.ObjectId,
     
      auto: true,
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        minLength: [11, 'Must be at least 11, got {VALUE}'],
        maxLength: 12,
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

const User = mongoose.model('User', UserSchema)

module.exports = User