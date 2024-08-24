const { check } = require("express-validator")
const validateResults = require("../utils/handleValidator")

const validatorCreateRating = [
  check("place_id")
    .exists()
    .notEmpty()
    .isNumeric(),
  check("score")
    .exists()
    .notEmpty()
    .isNumeric(),
  check("comment"),
  (req, res, next) => validateResults(req, res, next)
]

module.exports = { validatorCreateRating }