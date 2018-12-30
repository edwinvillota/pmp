import express from 'express'
import http from 'http'
import socketIO from 'socket.io'

const app = express()
const server = http.createServer(app)
const socket = socketIO(server)

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
  })

const emitters = {}

emitters.updateProgress = async (socket, data) => {
    try {
        socket.emit('uProgress', data)
    } catch (e) {
        console.log(e)
    }
}

socket.on('connection', socket => {
    console.log('cliente conectado')
    socket.on('disconnect', socket => {
        console.log('Cliente desconectado')
    })
})

export {socket, emitters}
export default server