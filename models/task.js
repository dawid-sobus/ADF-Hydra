// const { fileLoader } = require('ejs')
// const { Binary } = require('mongodb')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    clientId: {
        type: String,
        required: true
    },
    relatedTask: {
        type: String
    },
    nameOfService: {
        type: String,
        required: true
    },
    placeOfAssembly: {
        type: String,
        required: true
    },
    dateOfService: {
        type: Date,
        required: true
    },
    dateOfAssembly: {
        type: Date
    },
    warrantyDate: {
        type: Date
    },
    DateNextInspection: {
        type: Date
    },
    firstLaunchDate: {
        type: Date
    },
    performedActivity: {
        type: String
    },
    dateTime: {
        type: Date
    },
    mountedDevices: {
        type: String
    },
    yesNo: {
        type: String,
        default: 'nie'
    },
    invoice: {
        type: [String]
    },
    postWarrantyProtocols: {
        type: [String]
    },
    updated: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true }) //automatycznie dodaje wlasciwosci created at i updeted at i automatycznie wypelnia ich wlasciwosci i wypelnia je data gdy uzytkownik zostaje twozony oraz uaktualniony

const Task = mongoose.model('Task', taskSchema)
module.exports = Task