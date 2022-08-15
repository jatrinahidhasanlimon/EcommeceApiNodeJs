const mongoose = require('mongoose')


const validateEmail = email => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};


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
        unique: [true,'Must be at least 11, got {VALUE}'],
        validate: [validateEmail, 'Please provide a valid email address'],
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
          city : {
            type: String,
            minLength: [4, 'Must be at least 4, got {VALUE}'],
            maxLength: 52,
            required: true
          },
          area : {
            type: String,
            minLength: [4, 'Must be at least 4, got {VALUE}'],
            maxLength: 52,
            required: true
          },
          street : {
            type: String,
            minLength: [4, 'Must be at least 4, got {VALUE}'],
            maxLength: 52,
            required: true
        }
      },
})

const User = mongoose.model('User', UserSchema)

module.exports = User