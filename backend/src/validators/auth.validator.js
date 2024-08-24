const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

const validatorRegisterUser = [
  check("name")
    .exists()
    .notEmpty()
    .isLength({ min: 3, max: 99 }),
  check("surname")
    .exists()
    .notEmpty()
    .isLength({ min: 3, max: 99 }),
  check("username")
    .exists()
    .notEmpty()
    .isLength({ min: 3, max: 99 }),
  check("email")
    .exists()
    .notEmpty()
    .isEmail(),
  check("password")
    .exists()
    .notEmpty()
    .isLength({ min: 6, max: 20 }),
  (req, res, next) => {
    return validateResults(req, res, next)
  }
]

const validatorLoginUser = [
  check("email")
    .exists()
    .notEmpty()
    .isEmail(),
  check("password")
    .exists()
    .notEmpty()
    .isLength({ min: 6, max: 20 }),
  (req, res, next) => {
    return validateResults(req, res, next)
  }
]

module.exports = { validatorRegisterUser, validatorLoginUser }