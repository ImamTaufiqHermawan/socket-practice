const router = require('express').Router()
const { index, create } = require('../controller/chatController')
const { validate } = require('../validators')
const { auth } = require('../middleware/auth')

router.get('/', [auth], index)
router.post('/chat', [auth], create)

module.exports = router
