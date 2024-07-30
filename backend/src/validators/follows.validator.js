const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

const validatorCreateFollow = [
  check("follower_user_id")
    .exists()
    .notEmpty()
    .isNumeric(),
  check("followed_user_id")
    .exists()
    .notEmpty()
    .isNumeric(),
  (req, res, next) => {
    return validateResults(req, res, next)
  }
]

module.exports = { validatorCreateFollow }