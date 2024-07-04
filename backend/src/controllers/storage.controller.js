const storageModel = require('../models/storage')
const PUBLIC_URL = process.env.PUBLIC_URL

const getFile = (req, res) => {
  res.send({})
}

const uploadFile = async (req, res) => {
  const { body, file } = req
  console.log(file)

  const fileData = {
    filename: file.filename,
    url: `${PUBLIC_URL}/uploads/${file.filename}`
  }

  const data = await storageModel.create(fileData)
  res.send({ data })
}

module.exports = { getFile, uploadFile }