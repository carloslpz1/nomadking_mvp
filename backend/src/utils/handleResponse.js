const handleHttpError = (res, message = 'Something happend', code = 403, details = {}) => {
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

const handleHttpSuccess = (res, message = 'Successful request', code = 200, data = {}, pag = undefined, token = undefined) => {
  res.status(code)
  res.send({
    status: 'success',
    message: message,
    data: {
      items: data,
      pagination: pag ? pag : undefined
    },
    token: token
  })
}

module.exports = { handleHttpError, handleHttpSuccess }