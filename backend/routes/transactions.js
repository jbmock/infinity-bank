const express = require('express');

const {
    getTransactions,
    getTransaction,
    createTransaction
} = require('../controllers/transactionController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

//require auth for all API routes
router.use(requireAuth)

// GET all transactions
router.get('/', getTransactions)

// GET a single transaction
router.get('/:id', getTransaction)

// POST (create) a new transaction entry
router.post('/', createTransaction)

module.exports = router