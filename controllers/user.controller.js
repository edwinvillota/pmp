import User from '../models/user'
import jwt from 'jsonwebtoken'
import validateUser from '../validation/user'

const UserController = {}

UserController.getAll = async (req, res) => {
  try {
    await User.find().sort('name').exec((err, users) => {
      if (err) {
        res.status(500).send(err)
      }
      res.json({ users })
    })
  } catch (err) {
    res.send(err)
  }
}

UserController.register = (req, res) => {
  const { errors, isValid } = validateUser.register(req.body.newUser)

  if (!req.body.newUser) {
    res.status(403).end()
  }
  if (!isValid) {
    return res.status(400).json(errors)
  }
  let newUser = new User(req.body.newUser)
  newUser.save((err, saved) => {
    if (err) {
      console.log(err)
      res.status(500).send(err)
    } else {
      res.json({ user: saved })
    }
  })
}

UserController.sign_in = (req, res) => {
  const { errors, isValid } = validateUser.login(req.body.user)

  if (!isValid) {
    return res.status(400).json(errors)
  }
  User.findOne({
    CC: req.body.user.CC
  }, (err, user) => {
    if (!err && user) {
      user.comparePassword(req.body.user.password, (err, isMatch) => {
        if (err) throw err
        if (isMatch) {
          return res.json({ token: jwt.sign({ CC: user.CC, name: `${user.name} ${user.lastname}` }, 'RESTFULAPIs') })
        } else {
          return res.json({ token: false, error: 'Datos incorrectos' })
        }
      })      
    } else {
      return res.json({ token: false, error: 'Datos incorrectos'})
    }
  })
}

export default UserController
