const Club = require('../models/Club.js');
const mongoose = require('mongoose')
const {validationErrorHumanify} = require('../models/ErrorHandler.js');
const getClubs = (async (req, res) => {
    try {
        const allClub = await Club.find();
        return res.status(200).json(allClub)
    } catch (error) {
        return res.status(400).json(validationErrorHumanify(error))
    }
})
const getClub = (async (req, res) => {
    const clubID = (req.params.id)
    if (!mongoose.Types.ObjectId.isValid(clubID)) {
        return res.status(404).json({ msg: `Club not found with id :${clubID}`  });
    }
    try {
        let club = await Club.findById(clubID);
        if (club === null) {
           return res.status(404).json({ msg: `Club not found with id :${clubID}`  });
        } 
        return res.status(200).json(club)
    } catch (error) {
        return res.status(400).json(validationErrorHumanify(error))
    }
})
const  createClub = async (req, res) => {
    const newClub = {...req.body}
    try {
        let create = await Club.create(newClub)
        res.status(200).json(create)
    }catch(error){
        return res.status(400).json(validationErrorHumanify(error))
    }
}
const updateClub = ( async (req, res) => {
    const clubID = (req.params.id)
    const filter = { _id: clubID };
    if (!mongoose.Types.ObjectId.isValid(clubID)) {
        return res.status(404).json({ msg: `Club not found with id :${clubID}`  });
    }
    const info = {...req.body}
    try {
        let club = await Club.findOneAndUpdate(filter, info, {
            new: true
          });
          if (club === null) {
            return res.status(404).json({ msg: `Club not found with id :${clubID}`  });
         }
          return res.status(200).json(club) 
          
    } catch (error) {
        return res.status(400).json(validationErrorHumanify(error))
    }
})

const deleteClub = (async (req, res) => {
    let rMessage = {}
    const clubID = (req.params.id)
    if (!mongoose.Types.ObjectId.isValid(clubID)) {
        return res.status(404).json({ msg: `Club not found with id :${clubID}`  });
    }
    try {
        const deleteClub = await Club.findByIdAndRemove(clubID);
        if(deleteClub == null){
            return res.status(404).json('Failed to find Club by id: '+clubID)
        }
        rMessage['msg'] = 'Club deleted'
        rMessage['data'] = deleteClub
        res.status(200).json(rMessage)
    } catch (error) {
        console.log(error)
        return res.status(400).json(validationErrorHumanify(error))
    }
   
})

module.exports = {
    getClubs,
    getClub,
    createClub,
    updateClub,
    deleteClub
}