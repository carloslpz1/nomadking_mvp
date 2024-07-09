const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")
const { handleHttpError } = require("../utils/handleResponse")

const validatorCreatePost = [
  check("content")
    .exists()
    .notEmpty()
    .isLength({ min: 1, max: 255 }),
  check("media_id"),
  check("user_id")
    .exists()
    .notEmpty()
    .isNumeric(),
  (req, res, next) => {
    return validateResults(req, res, next)
  }
]

module.exports = { validatorCreatePost }