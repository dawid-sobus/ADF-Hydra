const bcrypt = require('bcryptjs')
const fs = require('fs')

const User = require('../models/user')
const Client = require('../models/client')
const Task = require('../models/task')

const userProfile = async (req, res) => {
    var { loggedUserId } = require('./loginRegisterHomeControllers')
    const userU = await User.findById(loggedUserId)
    
    res.render('userProfile/userProfile', { title: 'Profil-użytkownika', user: userU, userLoginMenu: userU })
}

const editUserProfile = async (req, res) => {
    var { loggedUserId } = require('./loginRegisterHomeControllers')
    const userU = await User.findById(loggedUserId)
    
    res.render('userProfile/editUserProfile', { title: 'Edytuj-profil', user: userU, userLoginMenu: userU })
}

const postEditUserProfile = async (req, res) => {
    var { loggedUserId } = require('./loginRegisterHomeControllers')
    try {

        const user = await User.findById(loggedUserId)
        var password = ''

        if(req.body.password == ''){
            password = user.password
        } else {
            password = await bcrypt.hash(req.body.password, 10)
        }

        const updateUser = {
            name: req.body.name,
            lastName: req.body.lastName,
            gender: req.body.gender,
            dateOfBirth: req.body.dateOfBirth,
            email: req.body.email,
            phone: req.body.phone,
            login: req.body.login,
            password: password
        }
        await User.updateOne({ "_id": user._id }, { $set: updateUser })

        const dirName = './public/uploads/' + user.login
        const newDirName = './public/uploads/' + req.body.login
        fs.rename(dirName, newDirName, (err) => {
            if (err) {
                console.log(err)
            }
        })

        res.redirect('/strona_glowna/profil_uzytkownika')
    } catch (error) {
        res.send('Nie udało się edytować użytkownika')
        console.log(error)
    }
}

const deleteUser = async (req, res) => {  
    var { loggedUserId } = require('./loginRegisterHomeControllers')  
    const user = await User.findById(loggedUserId)
    res.render('userProfile/deleteUser', { title: 'Usuń-użytkownika', userLoginMenu: user })
}

const deleteUserDelete = async (req, res) => {
    var { loggedUserId } = require('./loginRegisterHomeControllers')

    const user = await User.findById(loggedUserId)

    
    if (fs.existsSync('./public/uploads/' + user.login)) {
        fs.rmdirSync('./public/uploads/' + user.login, { recursive: true })
    }

    Task.remove({ userId: user._id }, (err, response) => { //usuwa wszystkie taski o id podanym
        if (err) {
            console.log(err)
        } else {
            console.log('usunieto')
        }
    })
    Client.remove({ userId: user._id }, (err, response) => {
        if (err) {
            console.log(err)
        } else {
            console.log('usunieto')
        }
    })

    loggedUserId = ''
    token = ''

    User.findByIdAndDelete(user._id)
        .then(result => {
            res.json({ redirect: '/logowanie' }) //musimy to zwrocic jako json bo w javascript nie da sie zwrocic przekierowania jakos response dlatego musimy to zwrocic jako json
        })
        .catch(err => {
            console.log(err)
        })
}

module.exports = {
    userProfile,
    editUserProfile,
    postEditUserProfile,
    deleteUser,
    deleteUserDelete
}