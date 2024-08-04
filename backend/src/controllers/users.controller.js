const Sequelize = require('sequelize')
const { sequelize } = require("../config/database")
const { UserModel, PostModel, StorageModel, FollowModel } = require('../models')
const { matchedData } = require('express-validator')
const { handleHttpSuccess, handleHttpError } = require('../utils/handleResponse')
const { verifyToken } = require('../utils/handleJwt')
const { QueryTypes } = require("sequelize")

const Op = Sequelize.Op

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
          ],
          [
            sequelize.literal(`(
              SELECT COUNT(*)
              FROM posts AS p
              WHERE p.user_id=users.id AND p.status='active'
            )`),
            'num_posts'
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

const findUsersByUsername = async (req, res) => {
  try {
    const username = req.params.username

    const token = req.headers.authorization.split(' ').pop()
    const dataToken = await verifyToken(token)

    // Find users by username is like
    const users = await UserModel.findAll({
      attributes: [
        'id',
        'name',
        'surname',
        'username',
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
              SELECT EXISTS(
                SELECT 1
                FROM follows
                WHERE follower_user_id = ${dataToken.id} AND followed_user_id = users.id
              )  
            )`),
          'following'
        ],
      ],
      where: {
        [Op.or]: [
          { name: { [Op.like]: `${username}%` } },
          { surname: { [Op.like]: `${username}%` } },
          { username: { [Op.like]: `${username}%` } }
        ]
      },
      limit: 5,
    })

    if (users.length == 0) {
      handleHttpError(res, 'No users found', 403, { search: 'No users found.' })
    } else {
      handleHttpSuccess(res, 'We find some users', 200, users)
    }
  } catch (e) {
    handleHttpError(res, 'Error with finding users')
  }
}

const getFollowers = async (req, res) => {
  try {
    const page = req.query.page && Number(req.query.page) ? Number(req.query.page) : 1
    const pageSize = req.query.page_size && Number(req.query.page_size) ? Number(req.query.page_size) : 4
    const followingBack = req.query.follow_back ? (req.query.follow_back === 'true' ? true : req.query.follow_back === 'false' ? false : null) : null

    const userId = req.params.user_id

    const token = req.headers.authorization.split(' ').pop()
    const dataToken = await verifyToken(token)

    let users = []

    if (followingBack == null) {
      users = await sequelize.query(`
        SELECT u.id, u.name, u.surname, u.username, s.url AS avatar
        FROM users u, follows f, storages s
        WHERE f.followed_user_id=${userId} AND u.id=follower_user_id AND s.id=u.avatar
        ORDER BY f.createdAt DESC
        LIMIT ${(page - 1) * pageSize}, ${pageSize};
        `, { type: QueryTypes.SELECT })
    } else {
      users = await sequelize.query(`
        SELECT u.id, u.name, u.surname, u.username, s.url AS avatar
        FROM users u, storages s
        JOIN follows f1 ON u.id=f1.follower_user_id
        LEFT JOIN follows f2 ON f1.follower_user_id=f2.followed_user_id AND f1.followed_user_id=f2.follower_user_id
        WHERE f1.followed_user_id=${userId} AND f2.follower_user_id IS NULL AND s.id=u.avatar
        ORDER BY f1.createdAt DESC
        LIMIT ${(page - 1) * pageSize}, ${pageSize};
      `, { type: QueryTypes.SELECT })
    }


    handleHttpSuccess(res, 'We find some users', 200, users)
  } catch (e) {
    console.log(e)
    handleHttpError(res, 'Error while getting the followers')
    return
  }
}

const getFollowed = async (req, res) => {

}

const getUsersForChat = async (req, res) => {
  try {
    // protect route with session
    const loggedUserId = req.user.id

    const users = await sequelize.query(`
      SELECT u.id, u.name, u.surname, u.username, u.email, u.avatar, c.id AS chat_id, c.user1_id, c.user2_id
      FROM users u
      JOIN chats c ON u.id=c.user1_id OR u.id=c.user2_id
      WHERE (c.user1_id=${loggedUserId} OR c.user2_id=${loggedUserId}) AND u.id!=${loggedUserId}
    `, { type: QueryTypes.SELECT })

    const chatUsers = []
    for (const user of users) {
      chatUsers.push({
        ...user,
        chat_id: undefined,
        user1_id: undefined,
        user2_id: undefined,
        chat: {
          id: user.chat_id,
          user1_id: user.user1_id,
          user2_id: user.user2_id
        }
      })
    }

    handleHttpSuccess(res, 'Data obtained', 200, chatUsers)
  } catch (e) {
    handleHttpError(res, 'Error while getting the user chats', 500)
    return
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

module.exports = { getUserByUsername, checkUsername, findUsersByUsername, getFollowers, getFollowed, updateUser, getUsersForChat }