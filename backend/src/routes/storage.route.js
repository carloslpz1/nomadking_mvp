const express = require('express')
const { uploadFile } = require('../controllers/storage.controller')

const router = express.Router()

// Middleware
const uploadMiddleware = require('../utils/handleStorage')

router.post('/', uploadMiddleware.single('file'), uploadFile)

module.exports = router