const express = require('express')
const cors = require('cors')
const http = require('http')
const config = require('./config/app')
const router = require('./router')
const SocketServer = require('./socket')

const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/uploads'))

app.use(router)

const port = config.appPort

const server = http.createServer(app)
server.listen(port)
SocketServer(server)

// app.listen(port, () => {
//   console.log(`server listening on port ${port}`)
// })
