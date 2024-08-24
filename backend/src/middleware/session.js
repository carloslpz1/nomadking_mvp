const { handleHttpError } = require('../utils/handleResponse')
const { verifyToken } = require('../utils/handleJwt')
const { UserModel } = require('../models')

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

    const user = await UserModel.findOne({
      where: { id: dataToken.id },
      attributes: { exclude: ['password'] }
    })

    if (!user) {
      handleHttpError(res, 'User not found', 404)
      return
    }

    req.user = user
    next()
  } catch (e) {
    console.log(e.message)
    handleHttpError(res, 'Error with the token verification')
  }
}

module.exports = authMiddleware