const express = require('express')
const router = express.Router()

const { getBalance, createBalance } = require('../controllers/balanceController');

const requireAuth = require('../middleware/requireAuth');

//require auth for API routes
router.use(requireAuth)

// GET a user's balance
router.get('/api/balance', getBalance)

// POST (create) a new balance entry
router.post('/api/balance', createBalance)

module.exports = router