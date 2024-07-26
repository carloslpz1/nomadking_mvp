const express = require("express")
const { getAllPosts, getPostsByUser, getPostByFollow, createPost, deletePost } = require("../controllers/posts.controller")
const { validatorCreatePost } = require("../validators/posts.validator")
const authMiddleware = require("../middleware/session")

const router = express.Router()

router.get('/', getAllPosts)
router.get('/:user_id', getPostsByUser)
router.get('/:user_id/follow', getPostByFollow)
router.post('/', authMiddleware, validatorCreatePost, createPost)
router.delete('/:post_id', authMiddleware, deletePost)

module.exports = router