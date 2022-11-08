const express = require('express')

const config = require('./config/app')

const app = express()

const port = config.appPort

app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})
