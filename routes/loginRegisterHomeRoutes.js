const express = require('express')
const jwt = require('jsonwebtoken')
const loginRegisterHomeControllers = require('../controllers/loginRegisterHomeControllers')
const router = express.Router()

const User = require('../models/user')

router.get('/logowanie', loginRegisterHomeControllers.loginPage)

router.get('/rejestracja', loginRegisterHomeControllers.registerPage)

router.post('/rejestracja', loginRegisterHomeControllers.postRegisterPage)

router.post('/logowanie', loginRegisterHomeControllers.postLoginPage)

router.get('/wyloguj', verifyToken, loginRegisterHomeControllers.logOut)

router.get('/strona_glowna', verifyToken, loginRegisterHomeControllers.homePage)

async function verifyToken(req, res, next) {
    var { token } = require('../controllers/loginRegisterHomeControllers')

    try {
        const decode = await jwt.verify(token, process.env.JWT_PRIVATE_KEY)
        const user = await User.findOne({ _id: decode._id, 'token': token })
       
        if (!user)
            throw new Error()
        next()
    } catch (error) {
        res.status(404).send({ error: "error podczas autoryzacji" })
    }
}

module.exports = {
    router,
    verifyToken
}