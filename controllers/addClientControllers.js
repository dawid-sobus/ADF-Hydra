const fs = require('fs')

const User = require('../models/user')
const Client = require('../models/client')
const Task = require('../models/task')

const { uploadFileInvoice } = require('./loginRegisterHomeControllers')
const { uploadFilePostWarrantyProtocols } = require('./loginRegisterHomeControllers')

const addClient = async (req, res) => {
    var { loggedUserId } = require('./loginRegisterHomeControllers')
    const user = await User.findById(loggedUserId)
    res.render('addClientPage/addClient', { title: 'Dodaj-klienta', userLoginMenu: user })
}

const postAddClient = async (req, res) => {
    var { loggedUserId } = require('./loginRegisterHomeControllers')
    try {
        const client = new Client({
            userId: loggedUserId,
            name: req.body.name,
            lastName: req.body.lastName,
            address: req.body.address,
            email: req.body.email,
            phone: req.body.phone
        })

        await client.save()
    }
    catch (error) {
            res.send('Nie udało się stworzyć klienta')
        console.log(error)
        return error
    }

    const user = await User.findById(loggedUserId)
    const client = await Client.findOne({ userId: user._id }).sort({ createdAt: -1 })
    
    try {
        
        try {
            fs.mkdirSync('./public/uploads/' + user.login + '/' + client.name + client.lastName + client._id)
            console.log('Utworzono folder')
        } catch (error) {
            if (error.code == 'EEXIST') {
                console.log('Ten folder juz istnieje')
            } else {
                console.log(error)
            }
        }

        const task = new Task({
            userId: user._id,
            clientId: client._id,
            nameOfService: req.body.nameOfService,
            placeOfAssembly: req.body.placeOfAssembly,
            dateOfService: req.body.dateOfService,
            dateOfAssembly: req.body.dateOfAssembly,
            warrantyDate: req.body.warrantyDate,
            DateNextInspection: req.body.DateNextInspection,
            firstLaunchDate: req.body.firstLaunchDate,
            performedActivity: req.body.performedActivity,
            dateTime: req.body.dateTime,
            mountedDevices: req.body.mountedDevices
        })

        await task.save()

        try {
            fs.mkdirSync('./public/uploads/' + user.login + '/' + client.name + client.lastName + client._id + '/' + task._id)
            console.log('Utworzono folder')
        } catch (error) {
            if (error.code == 'EEXIST') {
                console.log('Ten folder juz istnieje')
            } else {
                console.log(error)
            }
        }

        if (req.files) {

            if (req.files.invoice) {
                var file_1_name_counter = uploadFileInvoice(req.files, user, client, task)
                task.invoice = file_1_name_counter
                await task.save()
            }

            if (req.files.postWarrantyProtocols) {
                var file_2_name_counter = uploadFilePostWarrantyProtocols(req.files, user, client, task)
                task.postWarrantyProtocols = file_2_name_counter
                await task.save()
            }
        }
    }
    catch (error) {
        res.send('Nie udało się stworzyć zadania')
        console.log(error)
        const user = await User.findById(loggedUserId)
        const client = await Client.findOne({ userId: loggedUserId }).sort({ createdAt: -1 })
        
        if (fs.existsSync('./public/uploads/' + user.login + '/' + client.name + client.lastName + client._id)) {
            fs.rmdirSync('./public/uploads/' + user.login + '/' + client.name + client.lastName + client._id, { recursive: true }) //usuwa folder razem z zawartoscia
        }
        await Client.findOneAndRemove({}, { "sort": { "createdAt": -1 } })
        await Task.findOneAndDelete({}, { "sort": { "createdAt": -1 } })
    }

    res.redirect('/strona_glowna/klienci/' + client._id)
}

module.exports = {
    addClient,
    postAddClient
}