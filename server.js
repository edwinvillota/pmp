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
import transformers from './routes/transformers.routes'
// Middlewares imports
import Auth from './middlewares/authorization'
// Socket server
import socketServer from './controllers/socket.controller'

let app = express()

connectToDb()

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  res.header('Access-Control-Allow-Credentials','true')
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE')
  next()

})
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json({limit: '1020kb'}))

// Routes
app.use('/api', projects)
app.use('/api', users)
app.use('/api', appointments)
app.use('/api', dbcsv)
app.use('/api', transformers)
app.listen(config.port, () => {
  console.log(`Server started on port ${config.port}`)
})
// Start socket server
socketServer.listen(config.socketPort, () => {
  console.log(`Socket started on port ${config.socketPort}`)
})

