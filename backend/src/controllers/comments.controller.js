const { sequelize } = require("../config/database")
const { QueryTypes, Op } = require("sequelize")
const { CommentModel, PostModel, UserModel } = require('../models')
const { matchedData } = require('express-validator')
const { handleHttpSuccess, handleHttpError } = require('../utils/handleResponse')

const getCommentsByPost = async (req, res) => {
  try {
    const postId = req.params.post_id
    const page = req.query.page && Number(req.query.page) ? Number(req.query.page) : 1
    const pageSize = req.query.page_size && Number(req.query.page_size) ? Number(req.query.page_size) : 10

    const comments = await CommentModel.findAll({
      where: {
        post_id: postId
      },
      include: [
        {
          model: UserModel,
          // as: 'users',
          attributes: {
            exclude: ['email', 'password', 'avatar', 'career', 'banner', 'birthdate', 'role_id', 'age'],
            include: [
              [
                sequelize.literal(`(
                  SELECT s.url
                  FROM storages AS s
                  WHERE s.id = user.avatar  
                )`),
                'avatar'
              ],
              [
                sequelize.literal(`(
                  SELECT r.name
                  FROM roles AS r
                  WHERE r.id = user.role_id 
                )`),
                'role'
              ],
            ]
          },
          where: {
            id: { [Op.col]: 'comments.user_id' }
          },
          required: false
        }
      ],
      limit: pageSize,
      offset: (page - 1) * pageSize
    })

    const totalItems = await CommentModel.count({
      where: {
        post_id: postId
      }
    })
    const totalPages = Math.ceil(totalItems / pageSize)

    const pagination = {
      current_page: page,
      total_pages: totalPages,
      total_items: totalItems,
      items_per_page: pageSize
    }

    handleHttpSuccess(res, 'There you have the comments from this post', 200, comments, pagination)
  } catch (e) {
    console.log('Error in the comments controller "getCommentsByPost":', e.message)
    handleHttpError(res, 'Error while trying to get the comments', 500)
    return
  }
}

const createComment = async (req, res) => {
  try {
    const user = req.user
    const postId = req.params.post_id
    const data = matchedData(req)

    const newComment = CommentModel.build({
      content: data.content,
      user_id: user.id,
      post_id: postId
    })

    await newComment.save()

    handleHttpSuccess(res, 'Comment created', 201, newComment)
  } catch (e) {
    console.log('Error in the comments controller "createComment":', e.message)
    handleHttpError(res, 'Error while trying to create the comments', 500)
    return
  }
}

module.exports = { getCommentsByPost, createComment }