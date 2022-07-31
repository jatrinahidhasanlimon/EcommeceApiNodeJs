const express = require('express')
const router = express.Router()
const  { 
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} = require('../Controllers/UserController.js')

router.get('/', getUsers)
router.get('/:userID', getUser)
router.post('/', createUser) 
router.put('/:userID', updateUser) 
router.delete('/:userID', deleteUser)


module.exports = router