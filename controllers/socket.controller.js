import express from 'express'
import http from 'http'
import socketIO from 'socket.io'
import path from 'path'
import fs from 'fs'
import amqp from 'amqplib/callback_api' 

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

emitters.ordersData = async (socket, data) => {
    try { 
        socket.emit('ordersData', data)
    } catch (e) {
        console.log(e)
    }
}

emitters.uploadCSVStatus = async (socket, data) => {
    try {
        socket.emit('uploadCSVStatus', data) 
    } catch (e) {
        console.log(e)
    }
}

emitters.recordsCSVStatus = async (socket, data) => {
    try {
        socket.emit('recordsCSVStatus', data)
    } catch (e) {
        console.log(e)
    }
}

socket.on('connection', socket => {
    console.log('cliente conectado')
    socket.on('orderPDF', function (file) {
        const mainPath = path.dirname(require.main.filename)
        const folderPath = `storage/orders/${file.user}`

        // Create folder if no exists
        if (!fs.existsSync(folderPath)){
            fs.mkdirSync(folderPath)
        }

        const base64 = file.file.replace(/^data:application\/pdf;base64,/,'')
        fs.writeFile(`${folderPath}/${file.name}`, base64, 'base64', function(err) {
            
            // Python process
            const input = [
                './scripts/read_order.py',
                `${mainPath}/${folderPath}/${file.name}`,
                file.index
            ]

            amqp.connect('amqp://localhost', function(err, conn) {
                conn.createChannel(function(err, ch) {
                    const readOrder = 'readOrder'
                    ch.assertQueue(readOrder, {durable: false})
                    const results = 'results'
                    ch.assertQueue(results, {durable: false})

                    ch.sendToQueue(readOrder, new Buffer.from(JSON.stringify(input)))

                    ch.consume(results, function (msg) {
                        const content = JSON.parse(msg.content.toString())
                        emitters.ordersData(socket, content)
                        conn.close()
                    }, {noAck: true})
                })
            })


        })
    })
    socket.on('disconnect', socket => {
        console.log('Cliente desconectado')
    })
})

export {socket, emitters}
export default server