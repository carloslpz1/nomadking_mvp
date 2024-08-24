const { validationResult } = require("express-validator")
const { handleHttpError } = require("./handleResponse")

const validateResults = (req, res, next) => {
  try {
    validationResult(req).throw()
    return next()
  } catch (e) {
    handleHttpError(res, 'There is an error with the data', 403, e.array())
  }
}

module.exports = validateResults