const mongoose = require('mongoose')
const config = require('./config')
const uri = config.mongoUrl
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
}).catch(err => { console.log(err.reason) })

mongoose.connection.once('open', () => {
  console.log('MongoDb ye başarılı bir şekilde bağlandık...')
})

module.exports = mongoose.connection
