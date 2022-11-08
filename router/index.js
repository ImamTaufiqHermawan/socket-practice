const router = require('express').Router()
const Auth = require('./auth')

router.get('/', (req, res) => {
  res.send('hello')
})

router.use('/auth', Auth)

module.exports = router
