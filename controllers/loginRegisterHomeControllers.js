const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const moment = require('moment')
const fs = require('fs')

const User = require('../models/user')
const Client = require('../models/client')
const Task = require('../models/task')

const loginPage = (req, res) => {
    res.render('loginRegisterHome/loginPage', { title: 'Logowanie' })
}

const registerPage = (req, res) => {
    res.render('loginRegisterHome/registerPage', { title: 'Rejestracja' })
}

const postRegisterPage = async (req, res) => {
    try {
        const password = await bcrypt.hash(req.body.password, 10)

        const user = new User({
            name: req.body.name,
            lastName: req.body.lastName,
            gender: req.body.gender,
            dateOfBirth: `${req.body.year}-${req.body.month}-${req.body.day}`,
            email: req.body.email,
            phone: req.body.phone,
            login: req.body.login,
            password: password,
            token: 'no token'
        })

        await user.save()

        try {
            fs.mkdirSync('./public/uploads/' + user.login)
            console.log('Utworzono folder')
        } catch (error) {
            if (error.code == 'EEXIST') {
                console.log('Ten folder juz istnieje')
            } else {
                console.log(error)
            }
        }

        res.redirect('/logowanie')
    }
    catch (error) {
        console.log(error)
        if (error.code === 11000) {
            if (error.keyValue.login !== undefined) {
                res.send(`(${error.keyValue.login}) - ten login już istanieje. Wpisz inny login!`)
            }
            else {
                res.send(`( ${error.keyValue.email} ) - ten e-mail już istnieje. Wpisz inny e-mail!`)
            }
        }
        else {
            throw error
        }
    }

}

const postLoginPage = async (req, res) => {
    try {
        const user = await User.findOne({ login: req.body.login })
        if (user === null) {
            res.send(`( ${req.body.login} ) - Nie znaleziono takiego użytkownika!`)
        }
        else {
            if (await bcrypt.compare(req.body.password, user.password)) {

                var token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_PRIVATE_KEY)
                module.exports.token = token

                user.token = token
                await user.save()

                var loggedUserId = user._id
                module.exports.loggedUserId = loggedUserId
                
                res.redirect('/strona_glowna')
            }
            else {
                res.send('Nieprawidlowe haslo')
            }
        }
    } catch (err) {
        console.log(err)
    }
}

const logOut = async (req, res) => {
    var { token } = require('./loginRegisterHomeControllers')
    try {
        const user = await User.findOne({ token: token })

        loggedUserId = ''
        module.exports.loggedUserId = loggedUserId
        
        token = ''
        module.exports.token = token

        user.token = 'no token'
        await user.save()
        res.redirect('/logowanie')
    } catch (error) {
        res.send({ error: 'Wylogowywanie nie powiodło się' })
        console.log(error)
    }
}

const homePage = async (req, res) => {
    var { loggedUserId } = require('./loginRegisterHomeControllers')

    var date = new Date()
    var day = date.getDate()
    var month = (date.getMonth() + 1)
    var year = date.getFullYear()

    var dateB = new Date(`${year}-${month}-${day} 00:00`)

    date.setDate((date.getDate() + 1))

    day = date.getDate()

    var nextDate = new Date(`${year}-${month}-${day} 00:00`)

    const tasksForToday = await Task.find({ userId: loggedUserId, dateOfService: { $gte: dateB /*date*/, $lt: nextDate/*nextDate*/ } }).sort({ dateOfService: 1 })
    const clientC = await Client.find({ userId: loggedUserId })
    const user = await User.findById(loggedUserId)
    res.render('loginRegisterHome/homePage', { title: 'Strona-Główna', todayTasks: tasksForToday, clients: clientC, userLoginMenu: user, moment: moment })
}

function uploadFileInvoice(files, user, client, task) {

    if (files.invoice) {
        var date = new Date()
        var dateNow = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getHours() + '-' + date.getMinutes() + '-' + date.getSeconds()
        var file_1_counter = files.invoice
        var file_1_name_counter
        if (file_1_counter.length > 1) {
            file_1_name_counter = []
            for (var i = 0; i < file_1_counter.length; i++) {
                file_1_name_counter[i] = dateNow + '-' + file_1_counter[i].name

                file_1_counter[i].mv('./public/uploads/' + user.login + '/' + client.name + client.lastName + client._id + '/' + task._id + '/' + file_1_name_counter[i], function (err) {
                    if (err) {
                        console.log('File 1 error')
                        console.log(err)
                    } else {
                        console.log('File 1 uploaded')
                    }
                })

            }
        } else {
            file_1_name_counter = dateNow + '-' + file_1_counter.name
            file_1_counter.mv('./public/uploads/' + user.login + '/' + client.name + client.lastName + client._id + '/' + task._id + '/' + file_1_name_counter, function (err) {
                if (err) {
                    console.log('File 1 error')
                    console.log(err)
                } else {
                    console.log('File 1 uploaded')
                }
            })
        }
        return file_1_name_counter
    }
}

function uploadFilePostWarrantyProtocols(files, user, client, task) {
    if (files.postWarrantyProtocols) {

        var date = new Date()
        var dateNow = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getHours() + '-' + date.getMinutes() + '-' + date.getSeconds()

        var file_2_name_counter
        var file_2_counter = files.postWarrantyProtocols

        if (file_2_counter.length > 1) {

            file_2_name_counter = []
            for (var i = 0; i < file_2_counter.length; i++) {
                file_2_name_counter[i] = dateNow + '-' + file_2_counter[i].name

                file_2_counter[i].mv('./public/uploads/' + user.login + '/' + client.name + client.lastName + client._id + '/' + task._id + '/' + file_2_name_counter[i], function (err) {
                    if (err) {
                        console.log('File 2 error')
                        console.log(err)
                    } else {
                        console.log('File 2 uploaded')
                    }
                })
            }
        } else {
            file_2_name_counter = dateNow + '-' + file_2_counter.name
            file_2_counter.mv('./public/uploads/' + user.login + '/' + client.name + client.lastName + client._id + '/' + task._id + '/' + file_2_name_counter, function (err) {
                if (err) {
                    console.log('File 1 error')
                    console.log(err)
                } else {
                    console.log('File 1 uploaded')
                }
            })
        }
        return file_2_name_counter

    } else {
        console.log(`nie ma pliku`)
    }
}

module.exports = {
    loginPage,
    registerPage,
    postRegisterPage,
    postLoginPage,
    logOut,
    homePage,

    uploadFileInvoice,
    uploadFilePostWarrantyProtocols
}