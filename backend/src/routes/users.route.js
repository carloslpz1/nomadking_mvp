const express = require("express")
const { getUserByUsername, checkUsername, findUsersByUsername, updateUser } = require("../controllers/users.controller")
const { validateUsername, validatorUpdateUser } = require("../validators/users.validator")
const authMiddleware = require("../middleware/session")

const router = express.Router()

router.get('/:username', getUserByUsername)
router.get('/:username/check', validateUsername, checkUsername)
router.get('/:username/find', authMiddleware, findUsersByUsername)
router.put('/:id', validatorUpdateUser, updateUser)

module.exports = router