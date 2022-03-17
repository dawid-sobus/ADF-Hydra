const express = require('express')
const serviceControllers = require('../controllers/serviceControllers')
const router = express.Router()

var { verifyToken } = require('./loginRegisterHomeRoutes')

router.get('/', verifyToken, serviceControllers.viewService)

router.get('/kalendarz', verifyToken, serviceControllers.calendar)

router.get('/kalendarz/:data', verifyToken, serviceControllers.calendarDays)

router.get('/wszystkie_uslugi', verifyToken, serviceControllers.viewAllTasks)

router.post('/wszystkie_uslugi', serviceControllers.postViewAllTasks)

router.get('/powiazane_uslugi', verifyToken, serviceControllers.viewMainTasks)

router.post('/powiazane_uslugi', serviceControllers.postViewMainTasks)

router.get('/powiazane_uslugi/:taskId', verifyToken, serviceControllers.viewRelatedTask)

router.post('/powiazane_uslugi/:taskId', serviceControllers.postViewRelatedTask)

router.get('/uzupelnij_dane/:taskId', verifyToken, serviceControllers.taskDataComplete)

router.post('/uzupelnij_dane/:taskId', serviceControllers.postTaskDataComplete)

router.post('/uzupelnij_dane/:taskId/dodaj_pliki', serviceControllers.postTaskDataCompleteFiles)

router.get('/zadanie_powiazane/:taskId', verifyToken, serviceControllers.relatedTaskService)

router.post('/zadanie_powiazane/:taskId', serviceControllers.postRelatedTaskService)

router.post('/:counter/:taskId', serviceControllers.postRelatedTaskServiceYesNo)

module.exports = router