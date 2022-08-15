const User = require('../models/User.js');
const {validationErrorHumanify} = require('../models/ErrorHandler.js');
const mongoose = require('mongoose')
const getUsers = (async (req, res) => {
    try {
        const allUser = await User.find();
        return res.status(200).json(allUser)
    } catch (error) {
        return res.status(400).json(validationErrorHumanify(error))
    }
})
const getUser = (async (req, res) => {
    const userID = (req.params.id)
    if (!mongoose.Types.ObjectId.isValid(userID)) {
        return res.status(404).json({ msg: `user not found with id :${userID}`  });
    }
    try {
        let user = await User.findById(userID);
        if (user === null) {
           return res.status(404).json({ msg: `user not found with id :${userID}`  });
        } 
        res.status(200).json(user)
    } catch (error) {
        return res.status(400).json(validationErrorHumanify(error))
    }
})
const  createUser = async (req, res) => {
    const newUser = {...req.body}
    try {
        let create = await User.create(newUser)
        res.status(200).json(create)
    }catch(error){
        return res.status(400).json(validationErrorHumanify(error))
        
    }
}
const updateUser = ( async (req, res) => {
    const userID = (req.params.id)
    const filter = { _id: userID };
    if (!mongoose.Types.ObjectId.isValid(userID)) {
        return res.status(404).json({ msg: `user not found with id :${userID}`  });
    }
    const info = {...req.body}
    try {
        let user = await User.findOneAndUpdate(filter, info, {
            new: true
          });
          if (user === null) {
            return res.status(404).json({ msg: `user not found with id :${userID}`  });
         }
           res.status(200).json(user) 
          
    } catch (error) {
       
        return res.status(400).json(validationErrorHumanify(error))
    }
})

const deleteUser = (async (req, res) => {
    const userID = (req.params.id)
    if (!mongoose.Types.ObjectId.isValid(userID)) {
        return res.status(404).json({ msg: `user not found with id :${userID}`  });
    }
    try {
        const deleteUser = await User.findByIdAndRemove(userID);
        if(deleteUser == null){
            return res.status(404).json('Failed to find user by id: '+userID)
        }
        res.status(200).json('user deleted'+deleteUser)
        
        
    } catch (error) {
        return res.status(400).json(validationErrorHumanify(error))
    }
   
})
module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}