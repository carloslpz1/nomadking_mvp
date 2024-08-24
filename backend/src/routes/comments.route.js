const express = require("express")
const { getCommentsByPost, createComment } = require("../controllers/comments.controller")
const { validatorCreateComment } = require("../validators/comments.validator")
const authMiddleware = require("../middleware/session")

const router = express.Router()

router.get('/:post_id', authMiddleware, getCommentsByPost)
router.post('/:post_id', authMiddleware, validatorCreateComment, createComment)


module.exports = router