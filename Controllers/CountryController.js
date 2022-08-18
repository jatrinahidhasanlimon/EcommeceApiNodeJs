const Country = require('../models/Country.js');
const mongoose = require('mongoose')
const {validationErrorHumanify} = require('../models/ErrorHandler.js');
const getCountrys = (async (req, res) => {
    try {
        const allCountry = await Country.find();
        return res.status(200).json(allCountry)
    } catch (error) {
        return res.status(400).json(validationErrorHumanify(error))
    }
})
const getCountry = (async (req, res) => {
    const countryID = (req.params.id)
    if (!mongoose.Types.ObjectId.isValid(countryID)) {
        return res.status(404).json({ msg: `Country not found with id :${countryID}`  });
    }
    try {
        let country = await Country.findById(countryID);
        if (country === null) {
           return res.status(404).json({ msg: `country not found with id :${countryID}`  });
        } 
        return res.status(200).json(country)
    } catch (error) {
        return res.status(400).json(validationErrorHumanify(error))
    }
})
const  createCountry = async (req, res) => {
    const newCountry = {...req.body}
    try {
        let create = await Country.create(newCountry)
        res.status(200).json(create)
    }catch(error){
        return res.status(400).json(validationErrorHumanify(error))
    }
}
const updateCountry = ( async (req, res) => {
    const countryID = (req.params.id)
    const filter = { _id: countryID };
    if (!mongoose.Types.ObjectId.isValid(countryID)) {
        return res.status(404).json({ msg: `Country not found with id :${countryID}`  });
    }
    const info = {...req.body}
    try {
        let country = await Country.findOneAndUpdate(filter, info, {
            new: true
          });
          if (country === null) {
            return res.status(404).json({ msg: `Country not found with id :${countryID}`  });
         }
          return res.status(200).json(country) 
          
    } catch (error) {
        return res.status(400).json(validationErrorHumanify(error))
    }
})

const deleteCountry = (async (req, res) => {
    let rMessage = {}
    const countryID = (req.params.id)
    if (!mongoose.Types.ObjectId.isValid(countryID)) {
        return res.status(404).json({ msg: `Country not found with id :${countryID}`  });
    }
    try {
        const deleteCountry = await Country.findByIdAndRemove(countryID);
        if(deleteCountry == null){
            return res.status(404).json('Failed to find Country by id: '+countryID)
        }
        rMessage['msg'] = 'Country deleted'
        rMessage['data'] = deleteCountry
        res.status(200).json(rMessage)
    } catch (error) {
        console.log(error)
        return res.status(400).json(validationErrorHumanify(error))
    }
   
})

module.exports = {
    getCountrys,
    getCountry,
    createCountry,
    updateCountry,
    deleteCountry
}