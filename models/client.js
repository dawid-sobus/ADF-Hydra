// const { required } = require('joi')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const clientSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    phone: {
        type: String,
        required: true
    },
    updated: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true }) //automatycznie dodaje wlasciwosci created at i updeted at i automatycznie wypelnia ich wlasciwosci i wypelnia je data gdy uzytkownik zostaje twozony oraz uaktualniony

const Client = mongoose.model('Client', clientSchema)
module.exports = Client