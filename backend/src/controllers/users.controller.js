const { sequelize } = require("../config/database")
const { UserModel, PostModel, StorageModel } = require('../models')
const { matchedData } = require('express-validator')
const { handleHttpSuccess, handleHttpError } = require('../utils/handleResponse')
const { verifyToken } = require('../utils/handleJwt')

const getUserByUsername = async (req, res) => {
  try {
    const username = req.params.username

    if (!username) {
      handleHttpError(res, 'username param is missing', 400)
      return
    }

    // Check if the username exists on db
    const user = await UserModel.findOne({
      where: { username: username },
      // include: [
      //   {
      //     model: PostModel,
      //     as: 'posts',
      //   }
      // ],
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
      }
    })

    if (!user) {
      handleHttpError(res, 'User does not exists')
      return
    }
    user.set('password', undefined, { strict: false })

    // Check if the request is send by the same user we are querying
    const auth = req.headers.authorization

    if (auth) {
      const token = auth.split(' ').pop()
      const dataToken = await verifyToken(token)

      if (!dataToken) {
        handleHttpError(res, 'Token is expired', 403)
        return
      }

      if (user.id === dataToken.id) {
        // User is requesting his data
        console.log('Its me')
      } else {
        // Other user is requesting user info
        console.log('Hi there')
      }
    } else {
      // Send the basic profile information
      console.log('Im stalking')
    }

    handleHttpSuccess(res, 'User found', 200, user)
  } catch (e) {
    console.log(e)
    handleHttpError(res, 'Error getting the user.')
  }
}

const checkUsername = async (req, res) => {
  try {
    const username = req.params.username

    // Check if the username exists on db
    const user = await UserModel.findOne({
      where: { username: username },
    })

    if (user) {
      handleHttpError(res, 'Username already exists', 403, { username: 'Already exists' })
    } else {
      handleHttpSuccess(res, 'Username is valid', 200)
    }
  } catch (e) {
    handleHttpError(res, 'Error with checking the username')
  }
}

const getUsers = async (req, res) => {
  try {
    const data = await UserModel.findAll({})

    res.send({ data })
  } catch (e) {
    handleHttpError(res, 'Error with getting the USERS')
  }
}

const updateUser = async (req, res) => {
  try {
    // TODO: update this method for better control of the data
    req = matchedData(req)
    const { id, ...body } = req

    const data = await UserModel.update(body, {
      where: {
        id: id
      }
    })

    handleHttpSuccess(res, 'User data updated', 201, data)
  } catch (e) {
    console.log(e)
    handleHttpError(res, 'Error trying to update the user')
  }
}

const deleteUser = (req, res) => { }

module.exports = { getUserByUsername, checkUsername, updateUser }