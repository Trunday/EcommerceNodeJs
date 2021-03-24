const express = require('express')
const app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  return res.render('index')
})

app.listen(3000, () => {
  console.log('Sistem 3000 de çalışıyor.')
})

module.exports = app
