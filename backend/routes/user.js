const express = require('express');

// controller functions
const {signupUser, loginUser} = require('../controllers/userController');

const router = express.Router();

// route to login
router.post('/login', loginUser)

// route to signup
router.post('/signup', signupUser)

module.exports = router