const express = require('express')
const router = express.Router()
const  { 
    getCountrys,
    getCountry,
    createCountry,
    updateCountry,
    deleteCountry
} = require('../Controllers/CountryController.js')

router.get('/', getCountrys)
router.get('/:id', getCountry)
router.post('/', createCountry) 
router.put('/:id', updateCountry) 
router.delete('/:id', deleteCountry)


module.exports = router