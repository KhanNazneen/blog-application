const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userId: { type: String, unique: true, default: '' },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, min: 8 },
    mobileNumber: { type: Number, required: true },
    createdOn: { type: Date, default: '' }
})

mongoose.model('User', userSchema)