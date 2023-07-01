const mongoose = require('mongoose')

const Schema = mongoose.Schema

const balanceSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    accountBalance: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Balance', balanceSchema)
