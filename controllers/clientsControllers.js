const moment = require('moment')
const fs = require('fs')

const User = require('../models/user')
const Client = require('../models/client')
const Task = require('../models/task')

const { uploadFileInvoice } = require('./loginRegisterHomeControllers')
const { uploadFilePostWarrantyProtocols } = require('./loginRegisterHomeControllers')

const viewClients = async (req, res) => {
    var { loggedUserId } = require('./loginRegisterHomeControllers')
    const clientsResult = await Client.find({ userId: loggedUserId }).sort({ createdAt: -1 })
    const user = await User.findById(loggedUserId)

    res.render('clientsPages/viewClients', { title: 'Klieńci', userLoginMenu: user, clientR: clientsResult/*, taskR: taskResult */ })
}

const detailsClientsTasks = async (req, res) => {
    var { loggedUserId } = require('./loginRegisterHomeControllers')
    const id = req.params.id

    try {
        const user = await User.findById(loggedUserId)
        const idClient = await Client.findById(id)
        const tasksId = await Task.find({ clientId: id }).sort({ dateOfService: -1 })
        const taskYear = await Task.find({ userId: idClient.userId }).sort({ dateOfService: 1 }).limit(1)

        var yearT = new Date().getFullYear()
        if (taskYear.length != '0') {
            yearT = taskYear[0].dateOfService.getFullYear()
        }

        res.render('clientsPages/detailsClientsTasks', { title: 'Details', userLoginMenu: user, R_client: idClient, tasks: tasksId, yearTask: yearT, moment: moment })
    } catch (error) {
        console.log(error)
    }
}

const postDetailsClientsTasks = async (req, res) => {
    var { loggedUserId } = require('./loginRegisterHomeControllers')
    const id = req.params.id
    try {
        var month = req.body.month
        var year = req.body.year

        const user = await User.findById(loggedUserId)
        const clientC = await Client.findById(id)
        var taskT = await Task.find({ clientId: id }).sort({ dateOfService: -1 })
        const taskYear = await Task.find({ userId: clientC.userId }).sort({ dateOfService: 1 }).limit(1)
        var yearT = new Date().getFullYear()
        if (taskYear.length !== '0') {
            yearT = taskYear[0].dateOfService.getFullYear()
        }

        if (month != '00' && year != '0') {
            var counter = 0
            var allTasks = []
            var day = new Date(year, month, 0).getDate()
            tasksTAll = await Task.find({ userId: clientC.userId, dateOfService: { $gte: new Date(`${year}-${month}-01`), $lte: new Date(`${year}-${month}-${day}`) } }).sort({ dateOfService: -1 })
            for (var i = 0; i < tasksTAll.length; i++) {
                if (tasksTAll[i].clientId == clientC._id) {
                    allTasks[counter] = tasksTAll[i]
                    counter++
                }
            }
            taskT = allTasks
        } else if (month == '00' && year != '0') {
            var counter = 0
            var allTasks = []
            var tasksTAll = await Task.find({ userId: clientC.userId, dateOfService: { $gte: new Date(`${year}-01-01`), $lte: new Date(`${year}-12-31`) } }).sort({ dateOfService: -1 })
            for (var i = 0; i < tasksTAll.length; i++) {
                if (tasksTAll[i].clientId == clientC._id) {
                    allTasks[counter] = tasksTAll[i]
                    counter++
                }
            }
            taskT = allTasks
        } else if (month != '00' && year == '0') {
            var counter = 0
            var allTasks = []
            for (var year = new Date().getFullYear(); year >= yearT; year--) {
                var day = new Date(year, month, 0).getDate()
                var tasksTAll = await Task.find({ userId: clientC.userId, dateOfService: { $gte: new Date(`${year}-${month}-01`), $lte: new Date(`${year}-${month}-${day}`) }, clientId: id }).sort({ dateOfService: -1 })
                for (var i = 0; i < tasksTAll.length; i++) {
                    if (tasksTAll[i].clientId == clientC._id) {
                        allTasks[counter] = tasksTAll[i]
                        counter++
                    }
                }
            }
            taskT = allTasks
        }

        res.render('clientsPages/detailsClientsTasks', { title: 'Details', userLoginMenu: user, tasks: taskT, R_client: clientC, yearTask: yearT, moment: moment })
    } catch (error) {
        res.send('Nie udało się wyszukać usług')
        console.log(error)
    }
}

const addTask = async (req, res) => {
    var { loggedUserId } = require('./loginRegisterHomeControllers')
    const id = req.params.id

    const user = await User.findById(loggedUserId)
    res.render('clientsPages/addTask', { title: 'Dodaj_zadanie', userLoginMenu: user, clientId: id })
}

const postAddTask = async (req, res) => {
    const id = req.params.id
    var idTask

    const client = await Client.findById(id)
    const user = await User.findById(client.userId)

    try {
        const task = new Task({
            userId: client.userId,
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

        idTask = task._id

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

        res.redirect('/strona_glowna/klienci/' + id)
    } catch (error) {
        res.send('Nie udało się stworzyć zadania')
        
        if (fs.existsSync('./public/uploads/' + user.login + '/' + client.name + client.lastName + client._id + '/' + idTask)) {
            fs.rmdirSync('./public/uploads/' + user.login + '/' + client.name + client.lastName + client._id + '/' + idTask, { recursive: true }) //usuwa folder razem z zawartoscia
        }
        
        await Task.findOneAndDelete({}, { "sort": { "createdAt": -1 } })
    }
}

const editClient = async (req, res) => {
    var { loggedUserId } = require('./loginRegisterHomeControllers')
    const id = req.params.id
    const user = await User.findById(loggedUserId)
    const client = await Client.findById(id)
    res.render('clientsPages/editClient', { title: 'Edycja_klienta', userLoginMenu: user, clientId: client })
}

const postEditClient = async (req, res) => {
    const id = req.params.id
    try {
        const client = await Client.findById(id)
        const user = await User.findById(client.userId)
        const dirName = './public/uploads/' + user.login + '/' + client.name + client.lastName + client._id
        const newDirName = './public/uploads/' + user.login + '/' + req.body.name + req.body.lastName + client._id

        const updateClient = {
            name: req.body.name,
            lastName: req.body.lastName,
            address: req.body.address,
            email: req.body.email,
            phone: req.body.phone
        }
        await Client.updateOne({ "_id": client._id }, { $set: updateClient })

        fs.rename(dirName, newDirName, (err) => {
            if (err) {
                console.log(err)
            }
        })

        res.redirect('/strona_glowna/klienci/' + id)
    } catch (error) {
        console.log(error)
        res.send('Nie udało się stworzyć klienta')
    }
}

const deleteClient = async (req, res) => {
    var { loggedUserId } = require('./loginRegisterHomeControllers')
    const id = req.params.id
    const clientC = await Client.findById(id)
    const user = await User.findById(loggedUserId)
    res.render('clientsPages/deleteClient', { title: 'Usuń_klienta', userLoginMenu: user, element: clientC })
}

const deleteClientDelete = async (req, res) => {
    const id = req.params.id

    Task.remove({ clientId: id }, (err, response) => { //usuwa wszystkie taski o danym id
        if (err) {
            console.log(err)
        } else {
            console.log('usunieto')
        }
    })

    var client = await Client.findById(id)
    var user = await User.findById(client.userId)
    
    
    if (fs.existsSync('./public/uploads/' + user.login + '/' + client.name + client.lastName + client._id)) {
        fs.rmdirSync('./public/uploads/' + user.login + '/' + client.name + client.lastName + client._id, { recursive: true })
    }

    Client.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/strona_glowna/klienci' }) //musimy to zwrocic jako json bo w javascript nie da sie zwrocic przekierowania jakos response dlatego musimy to zwrocic jako json
        })
        .catch(err => {
            console.log(err)
        })
}

const addRelatedTask = async (req, res) => {
    var { loggedUserId } = require('./loginRegisterHomeControllers')
    const taskId = req.params.taskId
    const taskT = await Task.findById(taskId)
    const user = await User.findById(loggedUserId)
    res.render('clientsPages/addRelatedTask', { title: 'Dodaj-powiązaną-usługę', userLoginMenu: user, task: taskT, moment: moment })
}

const postAddRelatedTask = async (req, res) => {
    const id = req.params.id
    const taskId = req.params.taskId

    const client = await Client.findById(id)
    const user = await User.findById(client.userId)
    const taskT = await Task.findById(taskId)

    var taskRelated = ''
    if (taskT.relatedTask == undefined) {
        taskRelated = taskT._id
    } else if (taskT.relatedTask != undefined) {
        taskRelated = taskT.relatedTask
    }

    try {
        const task = new Task({
            userId: client.userId,
            clientId: client._id,
            relatedTask: taskRelated,
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

        res.redirect(`/strona_glowna/klienci/${id}`)
    } catch (error) {
        res.send('Nie udało się stworzyć zadania')
        
    if (fs.existsSync('./public/uploads/' + user.login + '/' + client.name + client.lastName + client._id + '/' + idTask)) {
        fs.rmdirSync('./public/uploads/' + user.login + '/' + client.name + client.lastName + client._id + '/' + idTask, { recursive: true }) //usuwa folder razem z zawartoscia
    }
        await Task.findOneAndDelete({}, { "sort": { "createdAt": -1 } })
    }
}

const editTask = async (req, res) => {
    var { loggedUserId } = require('./loginRegisterHomeControllers')
    const id = req.params.id
    const tId = req.params.taskId
    const user = await User.findById(loggedUserId)
    const clientC = await Client.findById(id)
    const taskT = await Task.findById(tId)
    res.render('clientsPages/editTask', { title: 'Edytuj_usługę', userLoginMenu: user, clientR: clientC, task: taskT, moment: moment })
}

const postEditTask = async (req, res) => {
    const id = req.params.id
    const tId = req.params.taskId
    try {
        const task = await Task.findById(tId)

        const updateTask = {
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
        }
        await Task.updateOne({ "_id": task._id }, { $set: updateTask })

        res.redirect('/strona_glowna/klienci/' + id)
    } catch (error) {
        res.send('Nie udało się zedytować usługi')
        console.log(error)
    }
}

const editFiles = async (req, res) => {
    var { loggedUserId } = require('./loginRegisterHomeControllers')
    const id = req.params.id
    const tId = req.params.taskId
    const user = await User.findById(loggedUserId)
    const clientC = await Client.findById(id)
    const taskT = await Task.findById(tId)
    res.render('clientsPages/editFiles', { title: 'Edytuj_pliki', userLoginMenu: user, clientR: clientC, task: taskT })
}

const postEditFiles = async (req, res) => {
    const id = req.params.id
    const tId = req.params.taskId
    try {
        const client = await Client.findById(id)
        const user = await User.findById(client.userId)
        const task = await Task.findById(tId)

        if (req.files) {

            if (req.files.invoice) {
                var file_1_name_counter = uploadFileInvoice(req.files, user, client, task)
                const updateTask = {
                    invoice: file_1_name_counter
                }
                await Task.updateOne({ "_id": task._id }, { $push: updateTask })
            }

            if (req.files.postWarrantyProtocols) {
                var file_2_name_counter = uploadFilePostWarrantyProtocols(req.files, user, client, task)
                const updateTask = {
                    postWarrantyProtocols: file_2_name_counter
                }
                await Task.updateOne({ "_id": task._id }, { $push: updateTask })
            }
        }

        res.redirect('/strona_glowna/klienci/' + id + '/' + tId + '/edytuj_pliki')
    } catch (error) {
        res.send('Nie udało się dodać pliku')
        console.log(error)
    }
}

const deleteTask = async (req, res) => {
    var { loggedUserId } = require('./loginRegisterHomeControllers')
    const id = req.params.id
    const tId = req.params.taskId
    const user = await User.findById(loggedUserId)
    const clientC = await Client.findById(id)
    const taskT = await Task.findById(tId)
    res.render('clientsPages/deleteTask', { title: 'Usuń_zadanie', userLoginMenu: user, clientR: clientC, task: taskT })
}

const deleteTaskDelete = async (req, res) => {
    const id = req.params.id
    const taskId = req.params.taskId

    const client = await Client.findById(id)
    const user = await User.findById(client.userId)
    const taskT = await Task.findById(taskId)

    if (taskT.relatedTask == undefined) {
        
        var tasksRelated = await Task.find({ relatedTask: taskT._id })
        var leng = tasksRelated.length
        for (var i = 0; i < leng; i++) {
            if (fs.existsSync('./public/uploads/' + user.login + '/' + client.name + client.lastName + client._id + '/' + tasksRelated[i]._id)) {
                fs.rmdirSync('./public/uploads/' + user.login + '/' + client.name + client.lastName + client._id + '/' + tasksRelated[i]._id, { recursive: true })
            }
            const r = await Task.remove({ _id: tasksRelated[i]._id })
        }
    }

    if (fs.existsSync('./public/uploads/' + user.login + '/' + client.name + client.lastName + client._id + '/' + taskId)) {
        fs.rmdirSync('./public/uploads/' + user.login + '/' + client.name + client.lastName + client._id + '/' + taskId, { recursive: true })
      }

    const response = await Task.remove({ _id: taskId })

    res.redirect('/strona_glowna/klienci/' + id)
}

const deleteFiles = async (req, res) => {
    var { loggedUserId } = require('./loginRegisterHomeControllers')
    const id = req.params.id
    const taskId = req.params.taskId
    const fileF = req.params.file
    const user = await User.findById(loggedUserId)
    const clientC = await Client.findById(id)
    const taskT = await Task.findById(taskId)
    res.render('clientsPages/deleteFiles', { title: 'Usuń_pliki', userLoginMenu: user, clientR: clientC, task: taskT, file: fileF })
}

const deleteFilesDelete = async (req, res) => {
    const id = req.params.id
    const taskId = req.params.taskId
    const fileF = req.params.file

    const client = await Client.findById(id)
    const user = await User.findById(client.userId)
    const taskT = await Task.findById(taskId)

    fs.unlink('./public/uploads/' + user.login + '/' + client.name + client.lastName + client._id + '/' + taskId + '/' + fileF, function (err) { //usuwamy pliki z uploads w razie nie stworzenia zadania
        if (err) {
            console.log(err)
        } else {
            console.log('plik został usunięty')
        }
    })

    var invI = 0
    taskT.invoice.every(inv => { //pętla wypisująca
        if (inv == fileF) {
            invI = 1
            return false //break, przerwanie petli
        } else { invI = 0 }
        return true //continue kontynuacja petli
    })

    if (invI == 1) {
        const result1 = await Task.updateOne({ "_id": taskId }, { $pull: { invoice: fileF } })
    }

    var protocolsP = 0
    taskT.postWarrantyProtocols.every(protocols => {
        if (protocols == fileF) {
            protocolsP = 1
            return false
        } else { protocols = 0 }
        return true
    })

    if (protocolsP == 1) {
        const result2 = await Task.updateOne({ "_id": taskId }, { $pull: { postWarrantyProtocols: fileF } })
    }

    res.json({ redirect: '/strona_glowna/klienci/' + id + '/' + taskId + '/edytuj_pliki' }) //musimy to zwrocic jako json bo w javascript nie da sie zwrocic przekierowania jakos response dlatego musimy to zwrocic jako json
}

const viewPdfInv = async (req, res) => {
    const inv = req.params.invoice
    const id = req.params.id
    const tId = req.params.taskId
    const c = await Client.findById(id)
    const u = await User.findById(c.userId)
    res.render('clientsPages/viewPdf', { title: 'pdf_file', clientC: c, user: u, task: inv, taskId: tId })
}

const viewPdfProt = async (req, res) => {
    const postW = req.params.postWarrantyProtocols
    const id = req.params.id
    const tId = req.params.taskId
    const c = await Client.findById(id)
    const u = await User.findById(c.userId)
    res.render('clientsPages/viewPdf', { title: 'pdf_file', clientC: c, user: u, task: postW, taskId: tId })
}


module.exports = {
    viewClients,
    detailsClientsTasks,
    postDetailsClientsTasks,
    addTask,
    postAddTask,
    editClient,
    postEditClient,
    deleteClient,
    deleteClientDelete,
    addRelatedTask,
    postAddRelatedTask,
    editTask,
    postEditTask,
    editFiles,
    postEditFiles,
    deleteTask,
    deleteTaskDelete,
    deleteFiles,
    deleteFilesDelete,
    viewPdfInv,
    viewPdfProt
}
