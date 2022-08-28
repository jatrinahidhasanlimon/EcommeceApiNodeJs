const express = require('express')
const router = express.Router()
const upload =  require('../middleware/upload.js'); 
const  { 
    getClubs,
    getClub,
    createClub,
    updateClub,
    deleteClub
} = require('../Controllers/ClubController.js')

router.get('/', getClubs)
router.get('/:id', getClub)
router.post('/', upload, createClub) 
router.put('/:id', updateClub) 
router.delete('/:id', deleteClub)


module.exports = router