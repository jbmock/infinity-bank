const express = require('express');

const { getBalance, createBalance } = require('../controllers/balanceController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

//require auth for API routes
router.use(requireAuth)

// GET a user's balance
router.get('/', getBalance)

// POST (create) a new balance entry
router.post('/', createBalance)

module.exports = router