import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const Schema = mongoose.Schema
const SALT_WORK_FACTOR = 10

let userSchema = new Schema({
  CC: { type: 'Number', required: true, unique: true },
  name: { type: 'String', required: true },
  lastname: { type: 'String', required: true },
  appointment: { type: 'String', required: true },
  email: { type: 'String', required: true },
  password: { type: 'String', required: true },
  level: { type: 'Number', required: true, default: '1' }
})

userSchema.pre('save', function (next) {
  let user = this
  if (!user.isModified('password')) return next()
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err)
      user.password = hash
      next()
    })
  })
})

userSchema.methods.comparePassword = function (cPassword, cb) {
  bcrypt.compare(cPassword, this.password, (err, isMatch) => {
    if (err) return cb(err)
    cb(null, isMatch)
  })
}
let user = mongoose.model('user', userSchema)

export default user
