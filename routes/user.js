const express = require('express')
const router = express.Router()

// controller functions
const { signupUser, loginUser } = require('../controllers/userController');

// route to login
router.post('/api/user/login', loginUser)

// route to signup
router.post('/api/user/signup', signupUser)

module.exports = router