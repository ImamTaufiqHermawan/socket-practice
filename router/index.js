const router = require('express').Router()
const Auth = require('./auth')
const User = require('./user')

router.get('/', (req, res) => {
  res.send('hello')
})

router.use('/auth', Auth)
router.use('/users', User)

module.exports = router
