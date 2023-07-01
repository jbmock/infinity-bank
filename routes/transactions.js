const express = require('express')
const router = express.Router()
const { getTransactions, getTransaction, createTransaction } = require('../controllers/transactionController');

const requireAuth = require('../middleware/requireAuth')

const router = Router()

//require auth for all API routes
router.use(requireAuth)

// GET all transactions
router.get('/api/transactions', getTransactions)

// GET a single transaction
router.get('/api/transactions/:id', getTransaction)

// POST (create) a new transaction entry
router.post('/api/transactions', createTransaction)

module.exports = router