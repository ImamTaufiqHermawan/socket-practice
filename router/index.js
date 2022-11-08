const router = require('express').Router()
const authController = require('../controller/authController')

router.get('/', (req, res) => {
  res.send('hello')
})

router.post('/login', authController.login)

module.exports = router
