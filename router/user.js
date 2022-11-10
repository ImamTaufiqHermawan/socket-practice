const router = require('express').Router()
const { update } = require('../controller/userController')
const { validate } = require('../validators')
const { auth } = require('../middleware/auth')
const { rules: updateRules } = require('../validators/user/update')
const { userFile } = require('../middleware/fileUpload')

router.put('/update', [auth], update)

module.exports = router
