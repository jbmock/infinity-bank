const mongoose = require('mongoose')

const Schema = mongoose.Schema

const transactionSchema = new Schema({
    transactionType: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }

}, {timestamps: true})

module.exports = mongoose.model('Transaction', transactionSchema)