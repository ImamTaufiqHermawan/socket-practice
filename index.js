const express = require('express')

const config = require('./config/app')
const router = require('./router')

const port = config.appPort

const app = express()

app.use(router)

app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})
