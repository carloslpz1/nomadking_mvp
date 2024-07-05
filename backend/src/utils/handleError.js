const handleHttpError = (res, message = 'something happend', code = 403, details = {}) => {
  res.status(code)
  res.send({
    status: 'error',
    error: {
      code: code,
      message: message,
      details: details
    }
  })
}

module.exports = { handleHttpError }