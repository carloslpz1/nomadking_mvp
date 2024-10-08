const jsonwebtoken = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET

const tokenSign = async (user) => {
  const sign = jsonwebtoken.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role,
      account: user.account_type
    },
    JWT_SECRET,
    {
      expiresIn: '1d'
    }
  )

  return sign
}

const verifyToken = async (token) => {
  try {
    return jsonwebtoken.verify(token, JWT_SECRET)
  } catch (e) {
    return null
  }
}

module.exports = { tokenSign, verifyToken }