const router = require('express').Router()
const { index, create, messages } = require('../controller/chatController')
const { validate } = require('../validators')
const { auth } = require('../middleware/auth')

router.get('/', [auth], index)
router.get('/messages', [auth], messages)
router.post('/chat', [auth], create)

module.exports = router
