const express = require("express")
const { matchedData } = require("express-validator")
const { validatorRegisterUser, validatorLoginUser } = require("../validators/auth.validator")
const { encrypt, compare } = require("../utils/handlePassword")
const { loginUser, registerUser } = require("../controllers/auth.controller")

const router = express.Router()

router.post('/signup', validatorRegisterUser, registerUser)

router.post('/login', validatorLoginUser, loginUser)

module.exports = router