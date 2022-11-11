const router = require('express').Router()
const { index, create, messages, deleteChat } = require('../controller/chatController')
const { validate } = require('../validators')
const { auth } = require('../middleware/auth')

router.get('/', [auth], index)
router.get('/messages', [auth], messages)
router.post('/chat', [auth], create)
router.delete('/:id', [auth], deleteChat)

module.exports = router
