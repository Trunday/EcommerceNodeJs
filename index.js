require('dotenv').config()
const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const logger = require('morgan')
require('./utils/db.config')
const MongoStore = require('connect-mongo')(session)
const mongoDbConnection = require('./utils/db.config')
const passport = require('passport')
require('./utils/authStategies/localStategies')
const authMiddleware = require('./middlewares/authMiddleware')
const flasherMiddleware = require('./middlewares/flasherMiddleware')
const authRoutes = require('./routes/authRoute')
const config = require('./utils/config')
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
app.use(express.static('public'))
app.use(logger('dev'))
app.use(passport.initialize())
app.use(passport.session())
app.locals.message = {}
app.locals.formData = {}
app.locals.errors = {}

app.use('/', authRoutes)

app.get('/', flasherMiddleware, (req, res) => {
  console.log(req.method)
  return res.render('index')
})

app.get('/homepage', authMiddleware, (req, res) => {
  return res.send(`
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
  </br>
  <a href="/logout"> Çıkış </a>
  `)
})

app.use((req, res, next) => {
  res.status(404).render('404')
})

app.listen(config.port, () => {
  console.log(`Sistem ${config.port} de çalışıyor.`)
})

module.exports = app
