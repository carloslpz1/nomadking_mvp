const express = require('express')
const { getMessages, sendMessage } = require('../controllers/message.controller')
const authMiddleware = require('../middleware/session')

const router = express.Router()

router.get('/:id', authMiddleware, getMessages)
router.post('/send/:id', authMiddleware, sendMessage)

module.exports = router