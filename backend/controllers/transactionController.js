const Transaction = require('../models/transactionModel')
const mongoose = require('mongoose')

// GET all transactions
const getTransactions = async (req, res) => {
    const user_id = req.user._id
    const transactions = await Transaction.find({ user_id }).sort({createdAt: -1})

    res.status(200).json(transactions)
}

// GET a single transaction
const getTransaction = async (req, res) => {
    const { id } = req.params
    
    // verifies if id is valid mongoose format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Transaction not found'})
    }

    // searches for transaction in DB by _id
    const transaction = await Transaction.findById(id)

    // if transaction not found in DB
    if (!transaction) {
        return res.status(404).json({error: 'Transaction not found'})
    }

    res.status(200).json(transaction)
}

// POST/create new transaction entry
const createTransaction = async (req, res) => {
    const {transactionType, amount} = req.body

    // add doc to db
    try {
        const user_id = req.user._id
        const transaction = await Transaction.create({transactionType, amount, user_id})
        res.status(200).json(transaction)
    }   catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getTransactions,
    getTransaction,
    createTransaction
}