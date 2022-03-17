const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const upload = require('express-fileupload')

require('dotenv').config()

const loginRegisterHomeRoutes = require('./routes/loginRegisterHomeRoutes')
const userProfileRoutes = require('./routes/userProfileRoutes')
const serviceRoutes = require('./routes/serviceRoutes')
const addClientRoutes = require('./routes/addClientRoutes')
const clientsRoutes = require('./routes/clientsRoutes')

//aplikacja express
const app = express()

let PORT = process.env.PORT || 3000

//polaczenie z mongodb
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(PORT))
    .catch((err) => console.log(err))

app.set('view engine', 'ejs') //to jest potrzebne aby wczytać strone z ejs
app.use(express.static('public'))
app.use(upload())

//static middleware 
app.use(express.urlencoded({ extended: true })) // to bierze cale url dane kodu z cerate.ejs i wkleja do obiektu ktory uzywamy w request objekt, czyli to potrzebne jest gdy bierzemy dane z formularza ze strony

//middlewere po zaimportowaniu morgan
app.use(morgan('dev')) //po uzyciu tego wypisuje sie cos w konsoi jakis czas czy cos, wybieramy opcje dev, loguje sie do konsoli

app.use(express.json())

//program
app.get('/', (req, res) => {
    res.redirect('/logowanie')
})

app.use('/', loginRegisterHomeRoutes.router)
app.use('/strona_glowna/profil_uzytkownika', userProfileRoutes)
app.use('/strona_glowna/serwis', serviceRoutes)
app.use('/strona_glowna/dodaj_klienta', addClientRoutes)
app.use('/strona_glowna/klienci', clientsRoutes)