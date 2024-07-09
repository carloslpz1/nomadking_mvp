const { handleHttpError } = require('../utils/handleResponse')
const { verifyToken } = require('../utils/handleJwt')

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      handleHttpError(res, 'Token is missing', 401)
      return
    }

    const token = req.headers.authorization.split(' ').pop()
    const dataToken = await verifyToken(token)

    if (!dataToken.id) {
      handleHttpError(res, 'Error with the token', 401)
      return
    }

    next()
  } catch (e) {
    handleHttpError(res, 'Error with the token verification')
  }
}

module.exports = authMiddleware