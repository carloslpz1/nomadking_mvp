const { sequelize } = require("../config/database")
const { matchedData } = require('express-validator')
const { handleHttpError, handleHttpSuccess } = require('../utils/handleResponse')
const userModel = require('../models/user')
const { encrypt, compare } = require('../utils/handlePassword')
const { tokenSign, verifyToken } = require('../utils/handleJwt')
const Role = require('../models/role')
const { UserModel } = require('../models')

const loginUser = async (req, res) => {
  try {
    req = matchedData(req)

    const user = await userModel.findOne({
      where: { email: req.email },
      attributes: {
        include: [
          [
            sequelize.literal(`(
              SELECT s.url
              FROM storages AS s
              WHERE s.id = users.avatar  
            )`),
            'avatar'
          ],
          [
            sequelize.literal(`(
              SELECT s.url
              FROM storages AS s
              WHERE s.id = users.banner  
            )`),
            'banner'
          ],
          [
            sequelize.literal(`(
              SELECT COUNT(*)
              FROM follows AS follows
              WHERE follows.followed_user_id = users.id
            )`),
            'followers'
          ],
          [
            sequelize.literal(`(
              SELECT COUNT(*)
              FROM follows AS follows
              WHERE follows.follower_user_id = users.id
            )`),
            'following'
          ]
        ]
      },
      include: [
        {
          model: Role,
          as: 'role',
          attributes: ['name']
        }
      ]
    })
    if (!user) {
      handleHttpError(res, 'Wrong email or password', 404)
      return
    }

    const hashPassword = user.password
    const check = await compare(req.password, hashPassword)

    if (!check) {
      handleHttpError(res, 'Wrong email or password', 401)
      return
    }

    user.set('password', undefined, { strict: false })
    const token = await tokenSign(user)

    handleHttpSuccess(res, 'Valid credentials', 200, user, undefined, token)
  } catch (e) {
    console.log(e)
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

    handleHttpSuccess(res, 'User registered', 201, userData)
  } catch (e) {
    handleHttpError(res, 'Error while registering user')
  }
}

const checkToken = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      handleHttpError(res, 'Token is missing', 401)
      return
    }

    const token = req.headers.authorization.split(' ').pop()
    const dataToken = await verifyToken(token)

    if (!dataToken.id) {
      handleHttpError(res, 'Error with the token', 401)
      return
    }

    const user = await UserModel.findOne({
      where: { id: dataToken.id },
      attributes: {
        include: [
          [
            sequelize.literal(`(
              SELECT s.url
              FROM storages AS s
              WHERE s.id = users.avatar  
            )`),
            'avatar'
          ],
          [
            sequelize.literal(`(
              SELECT s.url
              FROM storages AS s
              WHERE s.id = users.banner  
            )`),
            'banner'
          ],
          [
            sequelize.literal(`(
              SELECT COUNT(*)
              FROM follows AS follows
              WHERE follows.followed_user_id = users.id
            )`),
            'followers'
          ],
          [
            sequelize.literal(`(
              SELECT COUNT(*)
              FROM follows AS follows
              WHERE follows.follower_user_id = users.id
            )`),
            'following'
          ]
        ]
      },
      include: [
        {
          model: Role,
          as: 'role',
          attributes: ['name']
        }
      ]
    })

    user.set('password', undefined, { strict: false })

    handleHttpSuccess(res, 'Valid token', 200, user, undefined, token)
  } catch (e) {
    handleHttpError(res, 'Error with the token verification')
  }
}

module.exports = { loginUser, registerUser, checkToken }