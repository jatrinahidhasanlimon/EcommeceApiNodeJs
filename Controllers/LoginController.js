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
        expiresIn: 120 // expires in 24 hours 86400
      })
      res.status(200).send({ auth: true, token: token })
    });

  }
  const signup =  async (req, res) => {
    try {
      const { name , email, password, phone, gender, address } = req.body;
      // return res.send(req.body)
      const oldUser = await User.findOne({ email });
      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }
     let encryptedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        name,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        gender: gender,
        phone: phone,
        address: address,
        password: encryptedPassword
      });
      const token = jwt.sign(
        { id: user._id, email },
        process.env.JWT_SECRET_KEY,
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

const profile =  function  (req, res) {
    if (!req.headers.authorization) {
        return res.status(403).json({ error: 'No credentials sent! Token Missing.' });
    }

    jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY, async function(err, decodedToken) {
        if(err) {
            /* handle token err */
            console.log(process.env.JWT_SECRET_KEY)
            return res.status(403).json({ error: 'Token Mismatch! Failed to fetch data!', });
        }
        else {
            let userId = decodedToken.id;   // Add to req object
            console.log('User id from profile', req.headers.authorization)
            try {
                let user = await User.findById(userId);
                if (user === null) {
                    return res.status(404).json({ msg: `User not found with id :${userId}`  });
                }
                return res.status(200).json(user)
            } catch (error) {
                return res.status(400).json((error))
            }
            return res.send(decodedToken.id)
        }
    });

}
const profileWithBearer =  function  (req, res) {
    if (!req.headers.authorization) {
        return res.status(403).json({ error: 'No credentials sent! Token Missing.' });
    }
    console.log('bearer token ', req.headers.authorization.split("Bearer ")[1] )
    jwt.verify( req.headers.authorization.split("Bearer ")[1], process.env.JWT_SECRET_KEY, async function(err, decodedToken) {
        if(err) {
            /* handle token err */
            console.log(process.env.JWT_SECRET_KEY)
            return res.status(403).json({ error: 'Token Mismatch! Failed to fetch data!', });
        }
        else {
            let userId = decodedToken.id;   // Add to req object
            try {
                let user = await User.findById(userId);
                if (user === null) {
                    return res.status(404).json({ msg: `Club not found with id :${userId}`  });
                }
                return res.status(200).json(user)
            } catch (error) {
                return res.status(400).json((error))
            }
            return res.send(decodedToken.id)
        }
    });

}
 function retrieveUserFromToken(token){
    let userID;
         jwt.verify(token, process.env.JWT_SECRET_KEY, {ignoreExpiration: true},  (err, decodedToken) => {
         if (err) {
             throw err;
         } else {
             userID =    decodedToken.id;
         }
     })
     return userID;
}
const refreshToken =  function  (req, res) {
    if (!req.headers.authorization) {
        return res.status(403).json({ error: 'No credentials sent! Token Missing.' });
    }
    let uid = retrieveUserFromToken(req.headers.authorization);
    const token = jwt.sign(
        { id: uid, },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: "2h",
        }
    );
    res.status(200).send({ status: 'success', refresh_token: token })
    // res.status(200).send(token)


}

  module.exports = {
    login,
    signup,
    profile,
    profileWithBearer,
    refreshToken
}