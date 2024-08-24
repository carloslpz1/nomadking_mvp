const express = require("express")
const { createFollow, deleteFollow } = require('../controllers/follows.controller')
const authMiddleware = require("../middleware/session")
const { validatorCreateFollow } = require('../validators/follows.validator')

const router = express.Router()

// router.get('/', getAllPosts)
router.post('/', authMiddleware, validatorCreateFollow, createFollow)
router.delete('/', authMiddleware, validatorCreateFollow, deleteFollow)

module.exports = router