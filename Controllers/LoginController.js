const jwt = require("jsonwebtoken");
const User = require('../models/User.js');
const {validationErrorHumanify} = require('../models/ErrorHandler.js');
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const login = function(req, res) {
    User.findOne({ email: req.body.email }, function (err, user) {
      if (err) return res.status(500).send('Error on the server.')
      if (!user) return res.status(404).send('No user found.')
      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password)
      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null })
      var token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: 86400 // expires in 24 hours
      })
      res.status(200).send({ auth: true, token: token })
    });
    
  }
  const signup =  async (req, res) => {
    try {
      const { name , email, password, phone, gender, address } = req.body;
      const oldUser = await User.findOne({ email });
      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }
      encryptedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        name,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        gender: gender,
        phone: phone,
        address: address,
        password: encryptedPassword
      });
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      user.token = token
      res.status(201).json(user)
    } catch (err) {
        res.status(400).json(validationErrorHumanify(err))
    }
  };
  


  module.exports = {
    login,
    signup
}