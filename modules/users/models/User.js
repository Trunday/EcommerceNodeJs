const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'isim alanı gereklidir.'],
    maxlength: [64, 'isim alanı en fazla 64 karakterdir.'],
    minlength: [2, 'isim alanı en az 2 karakterdir.']
  },
  email: {
    type: String,
    require: [true, 'Email alanı gereklidir.'],
    maxlength: [128, 'Email alanı en fazla 128 karakterdir.'],
    index: true
  },
  password: {
    type: String,
    require: [true, 'Paralo alanı gereklidir.']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next()

  this.password = await bcrypt.hash(this.password, 10)
  next()
})

const User = mongoose.model('users', UserSchema)
module.exports = User
