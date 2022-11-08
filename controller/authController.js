const { User } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateToken = (user) => {
  delete user.password

  const token = jwt.sign(user, 'secret', { expiresIn: 86400 })

  return { ...user, ...{ token } }
}

async function login(req, res) {
  const { email, password } = req.body

  try {
    const user = await User.findOne({
      where: {
        email
      }
    })
    
    console.log(user.password)

    // check if user not found
    if (!user) return res.status(404).json({ message: 'user not found' })

    // check if password matches
    if (!bcrypt.compareSync(password, user.password)) return res.status(401).json({ message: 'incorrect password' })

    // generate auth token
    const userWithToken = generateToken(user.get({ raw: true }))
    return res.send(userWithToken)

  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

module.exports = {
  login,
}