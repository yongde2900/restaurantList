const mongoose = require('../config/mongoose')
const Schema = mongoose.Schema
const userSchema = new Schema({
    name: {
        type: String,
        require: false
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema)