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
      total_pages: totalPages,
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
      total_pages: totalPages,
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
    const page = req.query.page && Number(req.query.page) ? Number(req.query.page) : 1
    const pageSize = req.query.page_size && Number(req.query.page_size) ? Number(req.query.page_size) : 10

    const userId = req.params.user_id

    const posts = await sequelize.query(`
      SELECT *
      FROM (SELECT p.id, p.content, p.user_id, p.createdAt,
      (SELECT s.url FROM storages s WHERE s.id=p.media_id) AS media,
      (SELECT COUNT(*) FROM likes l WHERE l.post_id=p.id) AS "likes",
      EXISTS (SELECT 1 FROM likes l WHERE l.post_id=p.id AND l.user_id=${userId}) AS liked,
      (SELECT COUNT(*) FROM comments c WHERE c.post_id=p.id) AS "comments"
      FROM posts p
      WHERE p.user_id=${userId} AND p.status="active"
      UNION
      SELECT p.id, p.content, p.user_id, p.createdAt,
      (SELECT s.url FROM storages s WHERE s.id=p.media_id) AS media,
      (SELECT COUNT(*) FROM likes l WHERE l.post_id=p.id) AS "likes",
      EXISTS (SELECT 1 FROM likes l WHERE l.post_id=p.id AND l.user_id=${userId}) AS liked,
      (SELECT COUNT(*) FROM comments c WHERE c.post_id=p.id) AS "comments"
      FROM posts p
      JOIN follows f ON p.user_id=f.followed_user_id
      WHERE f.follower_user_id=${userId} AND p.status="active"
      ) AS union_posts
      ORDER BY union_posts.createdAt DESC
      LIMIT ${(page - 1) * pageSize}, ${pageSize};
    `, { type: QueryTypes.SELECT })

    const postsData = []
    for (const post of posts) {
      const users = await sequelize.query(`
        SELECT u.id, u.name, u.surname, u.username, s.url AS avatar
        FROM users u, storages s
        WHERE u.id=${post.user_id} AND u.avatar=s.id
      `, { type: QueryTypes.SELECT })
      postsData.push({ ...post, user_id: undefined, user: users[0] })
    }

    const queryTotalPosts = await sequelize.query(`
      SELECT COUNT(*) AS totalPosts
      FROM (SELECT p.id
      FROM posts p
      WHERE p.user_id=${userId} AND p.status="active"
      UNION
      SELECT p.id
      FROM posts p
      JOIN follows f ON p.user_id=f.followed_user_id
      WHERE f.follower_user_id=${userId} AND p.status="active"
      ) AS union_posts;
    `, { type: QueryTypes.SELECT })

    const totalPosts = queryTotalPosts[0].totalPosts
    const totalPages = Math.ceil(totalPosts / pageSize)

    const pagination = {
      current_page: page,
      total_pages: totalPages,
      total_items: totalPosts,
      items_per_page: pageSize
    }

    handleHttpSuccess(res, 'Here are all the post for this user', 200, postsData, pagination)
  } catch (e) {
    handleHttpError(res, 'Error with getting posts by user follow')
  }
}

const createPost = async (req, res) => {
  // TODO: add validation so that the user id and token data match
  try {
    const data = matchedData(req)

    PostModel.create({ ...data, status: 'active' })
    handleHttpSuccess(res, 'Post created', 201)
  } catch (e) {
    handleHttpError(res, 'Error with creating the post')
  }
}

const updatePost = async (req, res) => {

}

const deletePost = async (req, res) => {
  try {
    const postId = req.params.post_id

    if (!postId) {
      handleHttpError(res, 'Param post_id is missing.')
    }

    const post = await PostModel.findOne({
      where: { id: postId }
    })

    if (!post) {
      handleHttpError(res, 'Post does not exists', 403)
    }

    post.status = 'inactive'
    await post.save()

    handleHttpSuccess(res, 'Post successfuly deleted', 200, post)

  } catch (e) {
    handleHttpError(res, 'Error deleting the post')
  }
}

module.exports = { getAllPosts, getPostsByUser, getPostByFollow, createPost, updatePost, deletePost }