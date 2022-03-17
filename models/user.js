//const { required } = require('joi')
const mongoose = require('mongoose')
//const { token } = require('morgan')
const Schema = mongoose.Schema
//const jwt = require('jsonwebtoken')
//const validator = require('validator')

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    dateOfBirth: { 
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String
    },
    login: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    updated: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true }) //automatycznie dodaje wlasciwosci created at i updeted at i automatycznie wypelnia ich wlasciwosci i wypelnia je data gdy uzytkownik zostaje twozony oraz uaktualniony

const User = mongoose.model('User', userSchema)
module.exports = User