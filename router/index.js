const router = require('express').Router()
const Auth = require('./auth')
const User = require('./user')
const Chat = require('./chat')

router.get('/', (req, res) => {
  res.send('hello')
})

router.use('/auth', Auth)
router.use('/users', User)
router.use('/chats', Chat)

module.exports = router
