const express = require("express")
const { getUserByUsername, checkUsername, updateUser } = require("../controllers/users.controller")
const { validateUsername, validatorUpdateUser } = require("../validators/users.validator")

const router = express.Router()

router.get('/:username', getUserByUsername)
router.get('/:username/check', validateUsername, checkUsername)
router.put('/:id', validatorUpdateUser, updateUser)

module.exports = router