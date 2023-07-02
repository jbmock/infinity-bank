const express = require('express')
const router = express.Router()
const { getTransactions, getTransaction, createTransaction } = require('../controllers/transactionController');

const requireAuth = require('../middleware/requireAuth')

//require auth for all API routes
router.use(requireAuth)

// GET all transactions
router.get('/', getTransactions)

// GET a single transaction
router.get('/:id', getTransaction)

// POST (create) a new transaction entry
router.post('/', createTransaction)

module.exports = router