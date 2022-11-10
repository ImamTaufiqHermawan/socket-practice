const { User } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config/app')

const generateToken = (user) => {
  // delete user.password

  const token = jwt.sign(user, config.appKey, { expiresIn: 86400 })

  return { ...user, ...{ token } }
}

async function login(req, res) {
  const { email, password } = req.body

  try {

    // const secret = require('crypto').randomBytes(64).toString('hex')
    
    const user = await User.findOne({
      where: {
        email
      }
    })
    
    // check if user not found
    if (!user) return res.status(404).json({ message: 'user not found' })

    // check if password matches
    if (!bcrypt.compareSync(password, user.password)) return res.status(401).json({ message: 'incorrect password' })

    // generate auth token
    const userWithToken = generateToken(user.get({ raw: true }))
    userWithToken.avatar = user.avatar
    return res.send(userWithToken)

  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

async function register(req, res) {
  try {
    const user = await User.create(req.body)

    const userWithToken = generateToken(user.get({ raw: true }))
    return res.send(userWithToken)
    
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

module.exports = {
  login,
  register,
}