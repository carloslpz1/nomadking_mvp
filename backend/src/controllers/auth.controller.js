const { matchedData } = require('express-validator')
const { handleHttpError } = require('../utils/handleError')
const userModel = require('../models/user')
const { encrypt, compare } = require('../utils/handlePassword')
const { tokenSign, verifyToken } = require('../utils/handleJwt')
const Role = require('../models/role')

const loginUser = async (req, res) => {
  try {
    req = matchedData(req)

    const user = await userModel.findOne({
      where: { email: req.email },
      include: [
        {
          model: Role,
          as: 'role',
          attributes: ['name']
        }
      ]
    })
    if (!user) {
      handleHttpError(res, 'Invalid credentials', 404)
      return
    }

    const hashPassword = user.password
    const check = await compare(req.password, hashPassword)

    if (!check) {
      handleHttpError(res, 'Invalid credentials', 401)
      return
    }

    user.set('password', undefined, { strict: false })
    const data = {
      token: await tokenSign(user),
      user
    }

    res.send({ data })
  } catch (e) {
    handleHttpError(res, 'Error while login user')
  }
}

const registerUser = async (req, res) => {
  try {
    req = matchedData(req)

    const passwordHash = await encrypt(req.password)
    const body = { ...req, password: passwordHash }

    const userData = await userModel.create(body)

    userData.set('password', undefined, { strict: false })
    const data = {
      token: await tokenSign(userData),
      user: userData,
    }

    res.send({ data })
  } catch (e) {
    handleHttpError(res, 'Error while registering user')
  }
}

module.exports = { loginUser, registerUser }