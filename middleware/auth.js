const jwt = require('jsonwebtoken')
const config = require('../config/app')

exports.auth = (req, res, next) => {

  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(` `)[1]

  console.log(token)

  if (!token) {
    return res.status(401).json({
      error: true,
      message: 'token is not found'
    })
  }

  jwt.verify(token, config.appKey, (err, user) => {

    if (err) {
      return res.status(401).json({ err: err.message })
    }

    req.user = user
  })

  next()
}