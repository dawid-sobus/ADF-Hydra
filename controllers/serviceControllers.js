const moment = require('moment')
const fs = require('fs')

const User = require('../models/user')
const Client = require('../models/client')
const Task = require('../models/task')

const { uploadFileInvoice } = require('./loginRegisterHomeControllers')
const { uploadFilePostWarrantyProtocols } = require('./loginRegisterHomeControllers')

const viewService = async (req, res) => {
    var { loggedUserId } = require('./loginRegisterHomeControllers')
    var date = new Date()
    date.setDate(date.getDate() + 14)
    const tasksT = await Task.find({ userId: loggedUserId, dateOfService: { $gte: new Date(), $lte: date } }).sort({ dateOfService: 1 })

    var date1 = new Date()
    date1.setDate(date1.getDate() - 14)
    const taskTwoWeeksBack = await Task.find({ userId: loggedUserId, dateOfService: { $lte: new Date(), $gte: date1 } }).sort({ dateOfService: 1 })

    const taskTwoWeeksInspection = await Task.find({ userId: loggedUserId, DateNextInspection: { $gte: moment(new Date()).format('YYYY-MM-DD'), $lte: moment(date).format('YYYY-MM-DD') } }).sort({ DateNextInspection: 1 })

    const clientsC = await Client.find({ userId: loggedUserId })
    const user = await User.findById(loggedUserId)
    res.render('servicePages/viewService', { title: 'Serwis', userLoginMenu: user, tasks: tasksT, tasksBack: taskTwoWeeksBack, taskInspection: taskTwoWeeksInspection, clients: clientsC, moment: moment })
}

const calendar = async (req, res) => {
    var { loggedUserId } = require('./loginRegisterHomeControllers')
    const user = await User.findById(loggedUserId)

    const taskYear = await Task.find({ userId: loggedUserId }).sort({ dateOfService: 1 }).limit(1)
    var yearT = new Date().getFullYear()
    if (taskYear.length != '0') {
        yearT = taskYear[0].dateOfService.getFullYear()
    }

    const taskNextYear = await Task.find({ userId: loggedUserId }).sort({ dateOfService: -1 }).limit(1)
    var nextYearT = new Date().getFullYear()
    if (taskYear.length != '0') {
        nextYearT = taskNextYear[0].dateOfService.getFullYear()
    }

    const tasksT = await Task.find({ userId: loggedUserId }).sort({ dateOfService: 1 })
    const taskDataService = []
    var i=0
    tasksT.forEach(t => {
        taskDataService[i] = moment(t.dateOfService).format('YYYY-MM-DD')
        i++
    });

    res.render('servicePages/calendar', { title: 'Kalendarz', userLoginMenu: user, tYear: yearT, tNextYear: nextYearT, tasks: taskDataService, moment: moment })
}

const calendarDays = async (req, res) => {
    var { loggedUserId } = require('./loginRegisterHomeControllers')
    var dateC = req.params.data
    const user = await User.findById(loggedUserId)

    var dataForLabel = new Date(dateC)
    var nameDay = moment(dataForLabel).locale('pl').format('dddd')
    var day = dataForLabel.getDate()
    var month = moment(dataForLabel).locale('pl').format('MMMM')
    var year = dataForLabel.getFullYear()
    var calendarDate = nameDay + ' | ' + day + ' ' + month + ' ' + year

    var date = new Date(dateC)
    var dateB = new Date(date)
    date.setDate(date.getDate() + 1)
    var nextDate = new Date(date)

    const tasksForToday = await Task.find({ userId: loggedUserId, dateOfService: { $gte: dateB /*date*/, $lt: nextDate/*nextDate*/ } }).sort({ dateOfService: 1 })
    const clientC = await Client.find({ userId: loggedUserId })

    const taskYear = await Task.find({ userId: loggedUserId }).sort({ dateOfService: 1 }).limit(1)
    var yearT = new Date().getFullYear()
    if (taskYear.length != '0') {
        yearT = taskYear[0].dateOfService.getFullYear()
    }

    const taskNextYear = await Task.find({ userId: loggedUserId }).sort({ dateOfService: -1 }).limit(1)
    var nextYearT = new Date().getFullYear()
    if (taskYear.length != '0') {
        nextYearT = taskNextYear[0].dateOfService.getFullYear()
    }

    res.render('servicePages/calendarDays', { title: 'Dzień', userLoginMenu: user, clients: clientC, dateCalendar: tasksForToday, calendarData: calendarDate, currentDate: dateC, tYear: yearT, tNextYear: nextYearT, moment: moment })
}

const viewAllTasks = async (req, res) => {
    var { loggedUserId } = require('./loginRegisterHomeControllers')
    const user = await User.findById(loggedUserId)
    const clientC = await Client.find({ userId: loggedUserId })

    
    const taskT = await Task.find({ userId: loggedUserId }).sort({ dateOfService: -1 })
    const taskYear = await Task.find({ userId: loggedUserId }).sort({ dateOfService: 1 }).limit(1)
    var yearT = new Date().getFullYear()
    console.log(clientC.length)
    console.log(taskYear.length)
    if (taskYear.length != '0') {
        yearT = taskYear[0].dateOfService.getFullYear()
    }
    res.render('servicePages/viewAllTasks', { title: 'Wszystkie-zadania', userLoginMenu: user, clients: clientC, tasks: taskT, yearTask: yearT, moment: moment })
}

 const postViewAllTasks = async (req, res) => {
    var { loggedUserId } = require('./loginRegisterHomeControllers')
    try {
        const user = await User.findById(loggedUserId)
        const clientC = await Client.find({ userId: loggedUserId })
        var month = req.body.month
        var year = req.body.year

        var taskT = await Task.find({ userId: loggedUserId }).sort({ dateOfService: -1 })
        const taskYear = await Task.find({ userId: loggedUserId }).sort({ dateOfService: 1 }).limit(1)
        var yearT = new Date().getFullYear()
        if (taskYear.length != '0') {
            yearT = taskYear[0].dateOfService.getFullYear()
        }

        if (month != '00' && year != '0') {
            var day = new Date(year, month, 0).getDate()
            taskT = await Task.find({ userId: loggedUserId, dateOfService: { $gte: new Date(`${year}-${month}-01`), $lte: new Date(`${year}-${month}-${day}`) } }).sort({ dateOfService: -1 })
        } else if (month == '00' && year != '0') {
            taskT = await Task.find({ userId: loggedUserId, dateOfService: { $gte: new Date(`${year}-01-01`), $lte: new Date(`${year}-12-31`) } }).sort({ dateOfService: -1 })
        } else if (month != '00' && year == '0') {
            var counter = 0
            var allTasks = []
            for (var year = new Date().getFullYear(); year >= yearT; year--) {
                var day = new Date(year, month, 0).getDate()
                var tasksTAll = await Task.find({ userId: loggedUserId, dateOfService: { $gte: new Date(`${year}-${month}-01`), $lte: new Date(`${year}-${month}-${day}`) } }).sort({ dateOfService: -1 })
                for (var i = 0; i < tasksTAll.length; i++) {
                    allTasks[counter] = tasksTAll[i]
                    counter++
                }
            }
            taskT = allTasks
        }

        res.render('servicePages/viewAllTasks', { title: 'Wszystkie-zadania', userLoginMenu: user, clients: clientC, tasks: taskT, yearTask: yearT, moment: moment })
    } catch (error) {
        res.send('Nie udało się wyszukać usług')
        console.log(error)
    }
}

const viewMainTasks = async (req, res) => {
    var { loggedUserId } = require('./loginRegisterHomeControllers')
    const user = await User.findById(loggedUserId)
    const taskT = await Task.find({ userId: loggedUserId }).sort({ dateOfService: -1 })
    const clientC = await Client.find({ userId: loggedUserId })
    const taskYear = await Task.find({ userId: loggedUserId }).sort({ dateOfService: 1 }).limit(1)
    var yearT = new Date().getFullYear()
    if (taskYear.length != '0') {
        yearT = taskYear[0].dateOfService.getFullYear()
    }
    res.render('servicePages/viewMainTasks', { title: 'Główne-usługi', userLoginMenu: user, clients: clientC, tasks: taskT, yearTask: yearT, moment: moment })
}

const postViewMainTasks = async (req, res) => {
    var { loggedUserId } = require('./loginRegisterHomeControllers')
    try {
        var month = req.body.month
        var year = req.body.year

        const user = await User.findById(loggedUserId)
        const clientC = await Client.find({ userId: loggedUserId })
        var taskT = await Task.find({ userId: loggedUserId }).sort({ dateOfService: -1 })
        const taskYear = await Task.find({ userId: loggedUserId }).sort({ dateOfService: 1 }).limit(1)
        var yearT = new Date().getFullYear()
        if (taskYear.length != '0') {
            yearT = taskYear[0].dateOfService.getFullYear()
        }

        if (month != '00' && year != '0') {
            var day = new Date(year, month, 0).getDate()
            taskT = await Task.find({ userId: loggedUserId, dateOfService: { $gte: new Date(`${year}-${month}-01`), $lte: new Date(`${year}-${month}-${day}`) } }).sort({ dateOfService: -1 })
        } else if (month == '00' && year != '0') {
            taskT = await Task.find({ userId: loggedUserId, dateOfService: { $gte: new Date(`${year}-01-01`), $lte: new Date(`${year}-12-31`) } }).sort({ dateOfService: -1 })
        } else if (month != '00' && year == '0') {
            var counter = 0
            var allTasks = []
            for (var year = new Date().getFullYear(); year >= yearT; year--) {
                var day = new Date(year, month, 0).getDate()
                var tasksTAll = await Task.find({ userId: loggedUserId, dateOfService: { $gte: new Date(`${year}-${month}-01`), $lte: new Date(`${year}-${month}-${day}`) } }).sort({ dateOfService: -1 })
                for (var i = 0; i < tasksTAll.length; i++) {
                    allTasks[counter] = tasksTAll[i]
                    counter++
                }
            }
            taskT = allTasks
        }

        res.render('servicePages/viewMainTasks', { title: 'Główne-usługi', userLoginMenu: user, clients: clientC, tasks: taskT, yearTask: yearT, moment: moment })
    } catch (error) {
        res.send('Nie udało się wyszukać usług')
        console.log(error)
    }
}

const viewRelatedTask = async (req, res) => {
    var { loggedUserId } = require('./loginRegisterHomeControllers')
    const user = await User.findById(loggedUserId)
    const taskId = req.params.taskId
    const taskT = await Task.find({ userId: loggedUserId }).sort({ dateOfService: -1 })
    const thisTask = await Task.findById(taskId)
    const clientC = await Client.findById(thisTask.clientId)
    const taskYear = await Task.find({ userId: loggedUserId }).sort({ dateOfService: 1 }).limit(1)
    var yearT = new Date().getFullYear()
    if (taskYear.length !== '0') {
        yearT = taskYear[0].dateOfService.getFullYear()
    }
    res.render('servicePages/viewRelatedTask', { title: 'Powiązane-zadania', userLoginMenu: user, tasks: taskT, taskOne: thisTask, yearTask: yearT, clientR: clientC, moment: moment })
}

const postViewRelatedTask = async (req, res) => {
    var { loggedUserId } = require('./loginRegisterHomeControllers')
    const taskId = req.params.taskId
    try {
        var month = req.body.month
        var year = req.body.year

        const user = await User.findById(loggedUserId)
        var taskT = await Task.find({ userId: loggedUserId }).sort({ dateOfService: -1 })
        const thisTask = await Task.findById(taskId)
        const clientC = await Client.findById(thisTask.clientId)

        const taskYear = await Task.find({ userId: loggedUserId }).sort({ dateOfService: 1 }).limit(1)
        var yearT = new Date().getFullYear()
        if (taskYear.length !== '0') {
            yearT = taskYear[0].dateOfService.getFullYear()
        }

        if (month != '00' && year != '0') {
            var day = new Date(year, month, 0).getDate()
            taskT = await Task.find({ userId: loggedUserId, dateOfService: { $gte: new Date(`${year}-${month}-01`), $lte: new Date(`${year}-${month}-${day}`) } }).sort({ dateOfService: -1 })
        } else if (month == '00' && year != '0') {
            taskT = await Task.find({ userId: loggedUserId, dateOfService: { $gte: new Date(`${year}-01-01`), $lte: new Date(`${year}-12-31`) } }).sort({ dateOfService: -1 })
        } else if (month != '00' && year == '0') {
            var counter = 0
            var allTasks = []
            for (var year = new Date().getFullYear(); year >= yearT; year--) {
                var day = new Date(year, month, 0).getDate()
                var tasksTAll = await Task.find({ userId: loggedUserId, dateOfService: { $gte: new Date(`${year}-${month}-01`), $lte: new Date(`${year}-${month}-${day}`) } }).sort({ dateOfService: -1 })
                for (var i = 0; i < tasksTAll.length; i++) {
                    allTasks[counter] = tasksTAll[i]
                    counter++
                }
            }
            taskT = allTasks
        }

        res.render('servicePages/viewRelatedTask', { title: 'Powiązane-zadania', userLoginMenu: user, tasks: taskT, taskOne: thisTask, yearTask: yearT, clientR: clientC, moment: moment })
    } catch (error) {
        res.send('Nie udało się wyszukać usług')
        console.log(error)
    }
}

const taskDataComplete = async (req, res) => {
    var { loggedUserId } = require('./loginRegisterHomeControllers')
    const taskId = req.params.taskId
    const user = await User.findById(loggedUserId)
    const taskT = await Task.findById(taskId)
    const clientC = await Client.findById(taskT.clientId)
    res.render('servicePages/taskDataComplete', { title: 'Uzupełnij-dane', userLoginMenu: user, clientR: clientC, task: taskT, moment: moment })
}

const postTaskDataComplete = async (req, res) => {
    const taskId = req.params.taskId
    try {
        const task = await Task.findById(taskId)

        const updateTask = {
            dateOfAssembly: req.body.dateOfAssembly,
            warrantyDate: req.body.warrantyDate,
            DateNextInspection: req.body.DateNextInspection,
            firstLaunchDate: req.body.firstLaunchDate,
            performedActivity: req.body.performedActivity,
            dateTime: req.body.dateTime,
            mountedDevices: req.body.mountedDevices
        }
        await Task.updateOne({ "_id": task._id }, { $set: updateTask })

        res.redirect('/strona_glowna/serwis/uzupelnij_dane/' + taskId)
    } catch (error) {
        res.send('Nie udało się zedytować usługi')
        console.log(error)
    }
}

const postTaskDataCompleteFiles = async (req, res) => {
    const taskId = req.params.taskId
    try {
        const task = await Task.findById(taskId)
        const client = await Client.findById(task.clientId)
        const user = await User.findById(client.userId)

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

        res.redirect('/strona_glowna/serwis/uzupelnij_dane/' + taskId)
    } catch (error) {
        res.send('Nie udało się dodać pliku')
        console.log(error)
    }
}

const relatedTaskService = async (req, res) => {
    var { loggedUserId } = require('./loginRegisterHomeControllers')
    const taskId = req.params.taskId
    const taskT = await Task.findById(taskId)
    const clientC = await Client.findById(taskT.clientId)
    const user = await User.findById(loggedUserId)
    res.render('servicePages/relatedTaskService', { title: 'Dodaj-powiązane-zadanie', userLoginMenu: user, clientR: clientC, task: taskT, moment: moment })
}

const postRelatedTaskService = async (req, res) => {
    const taskId = req.params.taskId
    const taskT = await Task.findById(taskId)
    const clientC = await Client.findById(taskT.clientId)
    const user = await User.findById(clientC.userId)

    var taskRelated = ''
    if (taskT.relatedTask == undefined) {
        taskRelated = taskT._id
    } else if (taskT.relatedTask != undefined) {
        taskRelated = taskT.relatedTask
    }

    try {
        const task = new Task({
            userId: clientC.userId,
            clientId: clientC._id,
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
            fs.mkdirSync('./public/uploads/' + user.login + '/' + clientC.name + clientC.lastName + clientC._id + '/' + task._id)
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
                var file_1_name_counter = uploadFileInvoice(req.files, user, clientC, task)
                task.invoice = file_1_name_counter
                await task.save()
            }

            if (req.files.postWarrantyProtocols) {
                var file_2_name_counter = uploadFilePostWarrantyProtocols(req.files, user, clientC, task)
                task.postWarrantyProtocols = file_2_name_counter
                await task.save()
            }
        }

        res.redirect('/strona_glowna/serwis')

    } catch (error) {
        res.send('Nie udało się stworzyć zadania')
        
        if (fs.existsSync('./public/uploads/' + user.login + '/' + clientC.name + clientC.lastName + clientC._id + '/' + taskId)) {
            fs.rmdirSync('./public/uploads/' + user.login + '/' + clientC.name + clientC.lastName + clientC._id + '/' + taskId, { recursive: true })
        }
        console.log(error)
        await Task.findOneAndDelete({}, { "sort": { "createdAt": -1 } })
    }
}

const postRelatedTaskServiceYesNo = async (req, res) => {
    const counter = req.params.counter
    const taskId = req.params.taskId
    try {
        var str = JSON.stringify(req.body)

        for (var i = 1; i <= counter; i++) {
            if (str === `{"phone${i}":"tak"}`) {
                
                const updateTask = {
                    yesNo: 'tak'
                }
                await Task.updateOne({ "_id": taskId }, { $set: updateTask })
            } else {
                const updateTask = {
                    yesNo: 'nie'
                }
                await Task.updateOne({ "_id": taskId }, { $set: updateTask })
            }
        }
        res.redirect('/strona_glowna/serwis')
    } catch (error) {
        res.send('Nie udało się zapisać odpowiedzi')
        console.log(error)
    }
}

module.exports = {
    viewService,
    calendar,
    calendarDays,
    viewAllTasks,
    postViewAllTasks,
    viewMainTasks,
    postViewMainTasks,
    viewRelatedTask,
    postViewRelatedTask,
    taskDataComplete,
    postTaskDataComplete,
    postTaskDataCompleteFiles,
    relatedTaskService,
    postRelatedTaskService,
    postRelatedTaskServiceYesNo
}