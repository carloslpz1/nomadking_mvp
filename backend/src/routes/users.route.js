const express = require("express")
const { getUser, getUsers, createUser, updateUser, deleteUser } = require("../controllers/users.controller")
const { validatorCreateUser } = require("../validators/users.validator")

const router = express.Router()

router.get('/', getUsers)
router.get('/:id', getUser)
router.post('/', validatorCreateUser, createUser)

module.exports = router