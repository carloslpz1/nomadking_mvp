const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

const validatorCreateLike = [
  check("user_id")
    .exists()
    .notEmpty()
    .isNumeric(),
  check("post_id")
    .exists()
    .notEmpty()
    .isNumeric(),
  (req, res, next) => {
    return validateResults(req, res, next)
  }
]

module.exports = { validatorCreateLike }