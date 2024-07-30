const { sequelize } = require('../config/database')
const { FollowModel, UserModel } = require('../models')
const { matchedData } = require('express-validator')
const { QueryTypes } = require('sequelize')
const { handleHttpSuccess, handleHttpError } = require('../utils/handleResponse')
const { verifyToken } = require('../utils/handleJwt')

const createFollow = async (req, res) => {
  try {
    const data = matchedData(req)

    // token
    const token = req.headers.authorization.split(' ').pop()
    const dataToken = await verifyToken(token)

    if (data.follower_user_id !== dataToken.id) {
      handleHttpError(res, 'Error with the data', 401, { user_id: 'Does not match' })
      return
    }

    // User
    const follower_user = await UserModel.findOne({
      where: { id: data.follower_user_id }
    })
    const followed_user = await UserModel.findOne({
      where: { id: data.followed_user_id }
    })

    // Validation
    if (!follower_user || !followed_user) {
      handleHttpError(res, 'Error with the data', 403, {
        follower_user_id: 'maybe it doesn\'t exist',
        followed_user_id: 'maybe it doesn\'t exist'
      })
      return
    }

    // Are you following yourself?
    if (data.followed_user_id === data.follower_user_id) {
      handleHttpError(res, 'Error with the data', 403, { follower_user_id: 'It seems you are trying to follow yourself' })
      return
    }

    // validate if follow already exists
    const follow = await FollowModel.findOne({
      where: {
        follower_user_id: data.follower_user_id,
        followed_user_id: data.followed_user_id
      }
    })

    if (!follow) {
      // Create
      await FollowModel.create(data)
    }

    handleHttpSuccess(res, 'Follow added', 201)
  } catch (e) {
    handleHttpError(res, 'Error while addding a follow')
  }
}

const deleteFollow = async (req, res) => {
  try {
    const data = matchedData(req)

    // token
    const token = req.headers.authorization.split(' ').pop()
    const dataToken = await verifyToken(token)

    if (data.follower_user_id !== dataToken.id) {
      handleHttpError(res, 'Error with the data', 401, { user_id: 'Does not match' })
      return
    }

    // User
    const follower_user = await UserModel.findOne({
      where: { id: data.follower_user_id }
    })
    const followed_user = await UserModel.findOne({
      where: { id: data.followed_user_id }
    })

    // Validation
    if (!follower_user || !followed_user) {
      handleHttpError(res, 'Error with the data', 403, {
        follower_user_id: 'maybe it doesn\'t exist',
        followed_user_id: 'maybe it doesn\'t exist'
      })
      return
    }

    // Delete
    await FollowModel.destroy({
      where: {
        follower_user_id: data.follower_user_id,
        followed_user_id: data.followed_user_id
      }
    })


    handleHttpSuccess(res, 'Follow deleted', 200)
  } catch (e) {
    console.log(e)
    handleHttpError(res, 'Error while deleting a follow')
  }
}

module.exports = { createFollow, deleteFollow }