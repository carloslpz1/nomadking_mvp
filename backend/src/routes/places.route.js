const express = require('express')
const { getAllPlaces, getPlaceById, createRating } = require('../controllers/places.controller')
const authMiddleware = require('../middleware/session')
const { validatorCreateRating } = require('../validators/places.validator')

const router = express.Router()

router.get('/', authMiddleware, getAllPlaces)
router.get('/:place_id', authMiddleware, getPlaceById)
router.post('/ratings', authMiddleware, validatorCreateRating, createRating)

module.exports = router