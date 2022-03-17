const express = require('express')
const addClientControllers = require('../controllers/addClientControllers')
const router = express.Router()

var { verifyToken } = require('./loginRegisterHomeRoutes')

router.get('/', verifyToken, addClientControllers.addClient)

router.post('/', addClientControllers.postAddClient)

module.exports = router