const express = require('express')
const bodyParser = require('body-parser')
require('./utils/db.config')

const authRoutes = require('./routes/authRoute')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs')

app.use('/', authRoutes)

app.get('/', (req, res) => {
  return res.render('index')
})

app.listen(3000, () => {
  console.log('Sistem 3000 de çalışıyor.')
})

module.exports = app
