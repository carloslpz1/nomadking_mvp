const storageModel = require('../models/storage')
const { handleHttpSuccess, handleHttpError } = require('../utils/handleResponse')
const PUBLIC_URL = process.env.PUBLIC_URL

const getFile = (req, res) => {
  res.send({})
}

const uploadFile = async (req, res) => {
  try {
    const { body, file } = req

    const fileData = {
      filename: file.filename,
      url: `${PUBLIC_URL}/uploads/${file.filename}`
    }

    const data = await storageModel.create(fileData)
    // const data = {}
    handleHttpSuccess(res, 'Image successfuly uploaded', 201, data)
  } catch (e) {
    handleHttpError(res, 'Error uploading the image')
  }
}

module.exports = { getFile, uploadFile }