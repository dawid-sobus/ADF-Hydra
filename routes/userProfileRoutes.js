const express = require('express')
const userProfileControllers = require('../controllers/userProfileControllers')
const router = express.Router()

var { verifyToken } = require('./loginRegisterHomeRoutes')

router.get('/', verifyToken, userProfileControllers.userProfile)

router.get('/edytuj_profil', verifyToken, userProfileControllers.editUserProfile)

router.post('/edytuj_profil', userProfileControllers.postEditUserProfile)

router.get('/usun_uzytkownika', verifyToken, userProfileControllers.deleteUser)

router.delete('/usun_uzytkownika', userProfileControllers.deleteUserDelete)

module.exports = router