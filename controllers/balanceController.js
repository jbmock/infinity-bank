const Balance = require('../models/balanceModel')
const mongoose = require('mongoose')

// GET balance
const getBalance = async (req, res) => {
    const user_id = req.user._id
    const balance = await Balance.find({ user_id }).sort({createdAt: -1})

    res.status(200).json(balance)
    const { id } = req.params
    
    // verifies if id is valid mongoose format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Balance not found'})
    }

    // if _id not found
    if (!balance) {
        return res.status(404).json({error: 'Balance not found'})
    }

    // if _id found
    res.status(200).json(balance)
}

// POST (create) new balance entry
const createBalance = async (req, res) => {
    const {accountBalance} = req.body

    // add doc to db
    try {
        const user_id = req.user._id
        const balance = await Balance.create({accountBalance, user_id})
        res.status(200).json(balance)
    }   catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = { 
    getBalance,
    createBalance
}