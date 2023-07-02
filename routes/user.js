const express = require('express')
const router = express.Router()

// controller functions
const { signupUser, loginUser } = require('../controllers/userController');

// route to login
router.post('/login', loginUser)

// route to signup
router.post('/signup', signupUser)

module.exports = router