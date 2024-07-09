const { matchedData } = require('express-validator')
const { handleHttpError, handleHttpSuccess } = require('../utils/handleResponse')
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
    const token = await tokenSign(user)

    handleHttpSuccess(res, 'Valid credentials', 200, user, token)
  } catch (e) {
    handleHttpError(res, 'Error while login user')
  }
}

const registerUser = async (req, res) => {
  try {
    req = matchedData(req)

    let user = await userModel.findOne({
      where: { email: req.email },
    })
    if (user) {
      handleHttpError(res, 'Email already exists', 403)
      return
    }

    user = await userModel.findOne({
      where: { username: req.username },
    })
    if (user) {
      handleHttpError(res, 'Username already exists', 403)
      return
    }

    const passwordHash = await encrypt(req.password)
    const body = { ...req, password: passwordHash }

    const userData = await userModel.create(body)

    userData.set('password', undefined, { strict: false })
    const token = await tokenSign(userData)

    handleHttpSuccess(res, 'User registered', 201, userData, token)
  } catch (e) {
    handleHttpError(res, 'Error while registering user')
  }
}

module.exports = { loginUser, registerUser }