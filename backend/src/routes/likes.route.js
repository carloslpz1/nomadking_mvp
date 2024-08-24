const express = require("express")
const { createLike, deleteLike } = require('../controllers/likes.controller')
const authMiddleware = require("../middleware/session")
const { validatorCreateLike } = require('../validators/likes.validator')

const router = express.Router()

// router.get('/', getAllPosts)
router.post('/', authMiddleware, validatorCreateLike, createLike)
router.delete('/', authMiddleware, validatorCreateLike, deleteLike)

module.exports = router