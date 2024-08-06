const express = require("express")
const { getUserByUsername, checkUsername, findUsersByUsername, getFollowers, getFollowed, updateUser, getUsersForChat } = require("../controllers/users.controller")
const { validateUsername, validatorUpdateUser } = require("../validators/users.validator")
const authMiddleware = require("../middleware/session")

const router = express.Router()

router.get('/chats', authMiddleware, getUsersForChat)
router.get('/:username', authMiddleware, getUserByUsername)
router.get('/:username/check', validateUsername, checkUsername)
router.get('/:username/find', authMiddleware, findUsersByUsername)
router.get('/:user_id/followers', authMiddleware, getFollowers)
router.get('/:user_id/followed', authMiddleware, getFollowed)
router.put('/:id', validatorUpdateUser, updateUser)

module.exports = router