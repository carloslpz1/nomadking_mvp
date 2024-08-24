const { sequelize } = require('../config/database')
const { LikeModel, UserModel, PostModel } = require('../models')
const { matchedData } = require('express-validator')
const { QueryTypes } = require('sequelize')
const { handleHttpSuccess, handleHttpError } = require('../utils/handleResponse')
const { verifyToken } = require('../utils/handleJwt')

const createLike = async (req, res) => {
  try {
    const data = matchedData(req)

    // token
    const token = req.headers.authorization.split(' ').pop()
    const dataToken = await verifyToken(token)

    if (data.user_id !== dataToken.id) {
      handleHttpError(res, 'Error with the data', 401, { user_id: 'Does not match' })
      return
    }

    // User
    const user = await UserModel.findOne({
      where: { id: data.user_id }
    })

    // Post
    const post = await PostModel.findOne({
      where: { id: data.post_id }
    })

    // Validation
    if (!user || !post) {
      handleHttpError(res, 'Error with the data', 403, {
        user_id: 'maybe it doesn\'t exist',
        post_id: 'maybe it doesn\'t exist'
      })
      return
    }

    // validate if like already exists
    const like = await LikeModel.findOne({
      where: {
        user_id: data.user_id,
        post_id: data.post_id
      }
    })

    if (!like) {
      // Create
      const newLike = await LikeModel.create(data)
    }

    handleHttpSuccess(res, 'Like added', 201)
  } catch (e) {
    handleHttpError(res, 'Error while addding a like')
  }
}

const deleteLike = async (req, res) => {
  try {
    const data = matchedData(req)

    // token
    const token = req.headers.authorization.split(' ').pop()
    const dataToken = await verifyToken(token)

    if (data.user_id !== dataToken.id) {
      handleHttpError(res, 'Error with the data', 401, { user_id: 'Does not match' })
      return
    }

    // User
    const user = await UserModel.findOne({
      where: { id: data.user_id }
    })

    // Post
    const post = await PostModel.findOne({
      where: { id: data.post_id }
    })

    // Validation user and post
    if (!user || !post) {
      handleHttpError(res, 'Error with the data', 403, {
        user_id: 'maybe it doesn\'t exist',
        post_id: 'maybe it doesn\'t exist'
      })
      return
    }

    // validate if like already exists
    const like = await LikeModel.findOne({
      where: {
        user_id: data.user_id,
        post_id: data.post_id
      }
    })

    if (like) {
      // Delete
      await LikeModel.destroy({
        where: {
          user_id: data.user_id,
          post_id: data.post_id
        }
      })
    }

    handleHttpSuccess(res, 'Like deleted', 200)
  } catch (e) {
    handleHttpError(res, 'Error while deleting a like')
  }
}

module.exports = { createLike, deleteLike }