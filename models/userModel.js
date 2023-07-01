const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

// setting up schema to adhere to MongoDB so data can be stored there
const Schema = mongoose.Schema  
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

//static signup method
userSchema.statics.signup = async function (email, password) {

    // validation
    if (!email || !password) {
        throw Error('All fields are required')
    }
    if (!validator.isEmail(email)) {
        throw Error('Invalid email')
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough. Must be at least 8 characters long and contain the following: uppercase letter, lowercase letter, number, and special character')
    }

    const exists = await this.findOne({email})
    
    if (exists) {
        throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email, password: hash})

    console.log('User created successfully');
    return user
}

//static login method
userSchema.statics.login = async function (email, password) {

    if (!email || !password) {
        throw Error('All fields are required')
    }

    const user = await this.findOne({email})
    
    if (!user) {
        throw Error('Invalid login credentials')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Invalid login credentials')
    }

    return user
} 

module.exports = mongoose.model('User', userSchema)