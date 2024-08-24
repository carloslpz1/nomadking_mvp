const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

const validatorCreateComment = [
  check("content")
    .exists()
    .notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next)
  }
]

module.exports = { validatorCreateComment }