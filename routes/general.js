
const express = require('express')
const router = express.Router()
const  { 
    login,
    signup,
    profile,
    profileWithBearer,
    refreshToken
} = require('../Controllers/LoginController.js')

router.post('/login', login)

router.post('/signup', signup)
router.get('/profile', profile)
router.post('/refresh-token', refreshToken)
router.get('/profile-with-bearer-token', profileWithBearer)


module.exports = router