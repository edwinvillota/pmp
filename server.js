import express from 'express'
import bodyParser from 'body-parser'
// Database imports
import connectToDb from './db/connect'
// Config imports
import config from './config/index'
// Routes imports
import projects from './routes/projects.routes'
import users from './routes/users.routes'
import appointments from './routes/appointments.routes'
import dbcsv from './routes/dbcsv.routes'
// Middlewares imports
import Auth from './middlewares/authorization'
let app = express()

connectToDb()

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
// Routes
app.use('/api', Auth.verifyAuth)
// app.use('/api', Auth.requireAuth)
app.use('/api', projects)
app.use('/api', users)
app.use('/api', appointments)
app.use('/api', dbcsv)

app.listen(config.port, () => {
  console.log(`Server started on port ${config.port}`)
})
