const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
require('./utils/db.config')
const MongoStore = require('connect-mongo')(session)
const mongoDbConnection = require('./utils/db.config')
const passport = require('passport')
require('./utils/authStategies/localStategies')
const authMiddleware = require('./middlewares/authMiddleware')
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
  cookie: { secure: false },
  store: new MongoStore({ mongooseConnection: mongoDbConnection })
}))
app.use(passport.initialize())
app.use(passport.session())
app.locals.message = {}
app.locals.formData = {}
app.locals.errors = {}

app.use('/', authRoutes)

app.get('/', (req, res) => {
  console.log('User: ', req.user)
  return res.render('index')
})

app.get('/homepage', authMiddleware, (req, res) => {
  res.send(`
  <h1>Hoşgeldin...</h1>
  <div style='color: red'>
  ${req.user.name}
  </div>
  </br>
  <div style='color: blue'>
  <span style='color: red'>Kayıt Tarihi: </span>${req.user.createdAt}
  </div>
  </br>
  <a href="/"> Ana Sayfa </a>
  `)
})

app.listen(3000, () => {
  console.log('Sistem 3000 de çalışıyor.')
})

module.exports = app
