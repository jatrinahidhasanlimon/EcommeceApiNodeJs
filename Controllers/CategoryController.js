const Category = require('../models/Category.js');
const mongoose = require('mongoose')
const {validationErrorHumanify} = require('../models/ErrorHandler.js');
const getCategories = (async (req, res) => {
    try {
        const allCategory = await Category.find();
        return res.status(200).json(allCategory)
    } catch (error) {
        return res.status(400).json(validationErrorHumanify(error))
    }
})
const getCategory = (async (req, res) => {
    const clubID = (req.params.id)
    if (!mongoose.Types.ObjectId.isValid(clubID)) {
        return res.status(404).json({ msg: `Club not found with id :${clubID}`  });
    }
    try {
        let club = await Category.findById(clubID);
        if (club === null) {
           return res.status(404).json({ msg: `Club not found with id :${clubID}`  });
        } 
        return res.status(200).json(club)
    } catch (error) {
        return res.status(400).json(validationErrorHumanify(error))
    }
})
const  createCategory = async (req, res) => {
    // req.body.image = res.req.file.filename // overwrite image name
    return res.send(req.body)
    const newClub = {...req.body}
    try {
        let create = await Category.create(newClub)
        res.status(200).json(create)
    }catch(error){
        return res.status(400).json(validationErrorHumanify(error))
    }
}
const updateCategory = ( async (req, res) => {
    const clubID = (req.params.id)
    const filter = { _id: clubID };
    if (!mongoose.Types.ObjectId.isValid(clubID)) {
        return res.status(404).json({ msg: `Club not found with id :${clubID}`  });
    }
    const info = {...req.body}
    try {
        let club = await Category.findOneAndUpdate(filter, info, {
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

const deleteCategory = (async (req, res) => {
    let rMessage = {}
    const clubID = (req.params.id)
    if (!mongoose.Types.ObjectId.isValid(clubID)) {
        return res.status(404).json({ msg: `Club not found with id :${clubID}`  });
    }
    try {
        const deleteCategory = await Category.findByIdAndRemove(clubID);
        if(deleteCategory == null){
            return res.status(404).json('Failed to find Club by id: '+clubID)
        }
        rMessage['msg'] = 'Club deleted'
        rMessage['data'] = deleteCategory
        res.status(200).json(rMessage)
    } catch (error) {
        console.log(error)
        return res.status(400).json(validationErrorHumanify(error))
    }
   
})

module.exports = {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}