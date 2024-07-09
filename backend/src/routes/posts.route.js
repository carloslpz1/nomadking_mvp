const express = require("express")
const { getAllPosts, getPostsByUser, getPostByFollow, createPost } = require("../controllers/posts.controller")
const { validatorCreatePost } = require("../validators/posts.validator")

const router = express.Router()

router.get('/', getAllPosts)
router.get('/:user_id', getPostsByUser)
router.get('/:user_id/follow', getPostByFollow)
router.post('/', validatorCreatePost, createPost)

module.exports = router