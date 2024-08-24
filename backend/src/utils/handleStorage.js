const multer = require('multer')
const path = require("path")
const generateFileName = require('../utils/generateFileName')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const pathStorage = `${__dirname}/../public/uploads`

    cb(null, pathStorage)
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split('.').pop()
    const filename = `${generateFileName()}.${ext}`

    cb(null, filename)
  }
})

const uploadMiddleware = multer({
  storage,
  dest: path.join(__dirname, 'public/uploads'),
})

module.exports = uploadMiddleware