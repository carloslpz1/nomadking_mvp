const express = require("express")
const authMiddleware = require("../middleware/session")

const router = express.Router()

// router.get('/', getAllPosts)

module.exports = router