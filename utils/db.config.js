const mongoose = require('mongoose')
const uri = 'mongodb+srv://ms_store:msstore@cluster0.nzbeu.mongodb.net/' +
  'ms_store?retryWrites=true&w=majority'
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
}).catch(err => { console.log(err.reason) })

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
})
