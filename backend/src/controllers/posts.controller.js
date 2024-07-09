const { sequelize } = require("../config/database")
const { PostModel } = require('../models')
const { matchedData } = require('express-validator')
const { handleHttpSuccess, handleHttpError } = require('../utils/handleResponse')
const { verifyToken } = require('../utils/handleJwt')
const { QueryTypes } = require("sequelize")

const getAllPosts = async (req, res) => {
  try {
    // TODO: take this params from request.params
    const page = 1
    const pageSize = 10

    const posts = await PostModel.findAll({
      order: [
        ['createdAt', 'DESC']
      ],
      limit: pageSize,
      offset: (page - 1) * pageSize
    })

    const totalPosts = await PostModel.count()
    const totalPages = Math.ceil(totalPosts / pageSize)

    const pagination = {
      current_page: page,
      tota_pages: totalPages,
      total_items: totalPosts,
      items_per_page: pageSize
    }

    handleHttpSuccess(res, 'Here are all the posts', 200, posts, pagination)
  } catch (e) {
    handleHttpError(res, 'Error with getting all the posts')
  }
}

const getPostsByUser = async (req, res) => {
  try {
    // TODO: take this params from request.params
    const page = 1
    const pageSize = 10

    const userId = req.params.user_id

    const posts = await PostModel.findAll({
      where: {
        user_id: userId
      },
      order: [
        ['createdAt', 'DESC']
      ],
      limit: pageSize,
      offset: (page - 1) * pageSize
    })

    const totalPosts = await PostModel.count({
      where: {
        user_id: userId
      },
    })
    const totalPages = Math.ceil(totalPosts / pageSize)

    const pagination = {
      current_page: page,
      tota_pages: totalPages,
      total_items: totalPosts,
      items_per_page: pageSize
    }

    handleHttpSuccess(res, 'Here are all the post from this user', 200, posts, pagination)
  } catch (e) {
    handleHttpError(res, 'Error with getting posts by user')
  }
}

const getPostByFollow = async (req, res) => {
  try {
    // TODO: take this params from request.params
    const page = 1
    const pageSize = 10

    const userId = req.params.user_id

    const posts = await sequelize.query(`
      SELECT p.*
      FROM posts p
      JOIN follows f ON p.user_id=f.followed_user_id
      WHERE f.follower_user_id=${userId}
      ORDER BY p.createdAt DESC
      LIMIT ${(page - 1) * pageSize}, ${pageSize};  
    `, { type: QueryTypes.SELECT })

    const queryTotalPosts = await sequelize.query(`
      SELECT COUNT(p.id) AS totalPosts
      FROM posts p
      JOIN follows f ON p.user_id=f.followed_user_id
      WHERE f.follower_user_id=${userId};  
    `, { type: QueryTypes.SELECT })

    const totalPosts = queryTotalPosts[0].totalPosts
    const totalPages = Math.ceil(totalPosts / pageSize)

    const pagination = {
      current_page: page,
      tota_pages: totalPages,
      total_items: totalPosts,
      items_per_page: pageSize
    }

    handleHttpSuccess(res, 'Here are all the post from this user', 200, posts, pagination)
  } catch (e) {
    handleHttpError(res, 'Error with getting posts by user')
  }
}

const createPost = async (req, res) => {
  // TODO: add validation so that the user id and token data match
  try {
    req = matchedData(req)

    console.log(req)
    handleHttpSuccess(res, 'Post created', 201)
  } catch (e) {
    handleHttpError(res, 'Error with creating the post')
  }
}

const updatePost = async (req, res) => {

}

const deletePost = async (req, res) => {

}

module.exports = { getAllPosts, getPostsByUser, getPostByFollow, createPost, updatePost, deletePost }