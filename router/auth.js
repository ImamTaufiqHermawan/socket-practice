const router = require('express').Router()
const authController = require('../controller/authController')
const { validate } = require('../validators')
const {rules: registrationRules } = require('../validators/auth/register')
const {rules: loginRules } = require('../validators/auth/login')

router.post('/login', [loginRules, validate], authController.login)
router.post('/register', [registrationRules, validate], authController.register)

module.exports = router
