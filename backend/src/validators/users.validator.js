const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

const validatorCreateUser = [
  check("name")
    .exists()
    .notEmpty(),
  check("surname")
    .exists()
    .notEmpty(),
  check("username")
    .exists()
    .notEmpty(),
  check("email")
    .exists()
    .notEmpty()
    .isEmail(),
  check("password")
    .exists()
    .notEmpty(),
  (req, res, next) => validateResults(req, res, next)
]

module.exports = { validatorCreateUser }