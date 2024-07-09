const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")
const { handleHttpError } = require("../utils/handleResponse")

const validateUsername = (req, res, next) => {
  const username = req.params.username

  if (!username) {
    handleHttpError(res, 'username param is missing', 400)
    return
  }

  if (username.length < 3) {
    handleHttpError(res, 'username is too short', 400, { username: 'Username is too short' })
    return
  }

  const regex = /^[a-zA-z0-9_]+$/

  if (regex.test(username)) {
    next()
  } else {
    handleHttpError(res, 'Username contain invalid characters', 400, { username: 'Username only can contain letters, numbers and underscore' })
  }
}

const validatorUpdateUser = [
  check("id")
    .exists()
    .notEmpty()
    .isNumeric(),
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
  check("avatar")
    .exists()
    .notEmpty()
    .isNumeric(),
  check("banner")
    .exists()
    .notEmpty()
    .isNumeric(),
  check("birthdate")
    .exists()
    .notEmpty(),
  check("account_type")
    .exists()
    .notEmpty(),
  (req, res, next) => validateResults(req, res, next)
]

module.exports = { validateUsername, validatorUpdateUser }