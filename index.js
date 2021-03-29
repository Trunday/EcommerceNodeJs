const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
require('./utils/db.config')
const passport = require('passport')
require('./utils/authStategies/localStategies')

const authRoutes = require('./routes/authRoute')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
// app.set('trust proxy', 1)
/**
 *  Burada secret için node yazılımını açtım.
 *  Devamında ekrana: crypto.randomBytes(20).toString('HEX')
 *  yazdım. Cevap olarak verdiğini ise secret olarak kullandım.
 */
app.use(session({
  secret: '9af1bb4f7d11d6c6b6aec4e83474101c8ebf2dfc',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/', authRoutes)

app.get('/', (req, res) => {
  req.session.views = (req.session.views || 0) + 1
  console.log('User: ', req.user)
  return res.render('index')
})

app.listen(3000, () => {
  console.log('Sistem 3000 de çalışıyor.')
})

module.exports = app
