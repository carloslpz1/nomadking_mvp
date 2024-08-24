const { sequelize } = require("../config/database")
const { QueryTypes, Op } = require("sequelize")
const { matchedData } = require('express-validator')
const { PlaceModel, PlaceRatingModel, UserModel, PhoneModel, AddressModel } = require('../models')
const { handleHttpSuccess, handleHttpError } = require('../utils/handleResponse')

const getAllPlaces = async (req, res) => {
  try {
    const page = req.query.page && Number(req.query.page) ? Number(req.query.page) : 1
    const pageSize = req.query.page_size && Number(req.query.page_size) ? Number(req.query.page_size) : 10

    const places = await PlaceModel.findAll({
      attributes: {
        include: [
          [
            sequelize.literal(`(
              SELECT s.url
              FROM storages AS s
              WHERE s.id=places.photo
            )`),
            'photo'
          ],
          [
            sequelize.literal(`(
              SELECT COUNT(pr.score)
              FROM places_ratings AS pr
              WHERE pr.place_id=places.id
            )`),
            'num_ratings'
          ],
          [
            sequelize.literal(`(
              SELECT AVG(pr.score)
              FROM places_ratings AS pr
              WHERE pr.place_id=places.id
            )`),
            'score_avg'
          ],
          [
            sequelize.literal(`(
              SELECT CONCAT(ph.country_code, ' ', ph.number) AS number
              FROM phones AS ph
              WHERE ph.place_id=places.id
            )`),
            'phones'
          ]
        ]
      },
      order: [
        ['num_ratings', 'DESC'],
        ['score_avg', 'DESC']
      ],
      limit: pageSize,
      offset: (page - 1) * pageSize,
      include: [
        {
          model: AddressModel,
          attributes: {
            exclude: ['id', 'createdAt', 'updatedAt']
          },
          where: { id: { [Op.col]: 'places.address_id' } }
        }
      ],
    })

    const totalPlaces = await PlaceModel.count()
    const totalPages = Math.ceil(totalPlaces / pageSize)

    const pagination = {
      current_page: page,
      total_pages: totalPages,
      total_items: totalPlaces,
      items_per_page: pageSize
    }

    handleHttpSuccess(res, 'There you have, all the places', 200, places, pagination)
    return
  } catch (e) {
    console.log("Error in the places controller 'getAllPlaces': ", e.message)
    handleHttpError(res, 'Error while getting the places')
    return
  }
}

const getPlaceById = async (req, res) => {
  try {
    const placeId = req.params.place_id

    const place = await PlaceModel.findOne({
      where: { id: placeId },
      attributes: {
        exclude: ['address_id'],
        include: [
          [
            sequelize.literal(`(
              SELECT s.url
              FROM storages AS s
              WHERE s.id=places.photo
            )`),
            'photo'
          ],
          [
            sequelize.literal(`(
                  SELECT COUNT(pr.score)
                  FROM places_ratings AS pr
                  WHERE pr.place_id=places.id
                )`),
            'num_ratings'
          ],
          [
            sequelize.literal(`(
                  SELECT AVG(pr.score)
                  FROM places_ratings AS pr
                  WHERE pr.place_id=places.id
                )`),
            'score_avg'
          ],
          [
            sequelize.literal(`(
              SELECT CONCAT(ph.country_code, ' ', ph.number) AS number
              FROM phones AS ph
              WHERE ph.place_id=places.id
            )`),
            'phones'
          ]
        ]
      },
      include: [
        {
          model: AddressModel,
          attributes: {
            exclude: ['id', 'createdAt', 'updatedAt']
          },
          where: { id: { [Op.col]: 'places.address_id' } }
        },
        {
          model: PlaceRatingModel,
          attributes: {
            exclude: ['place_id', 'user_id']
          },
          where: {
            place_id: { [Op.col]: 'places.id' }
          },
          include: [
            {
              model: UserModel,
              as: 'user',
              attributes: {
                exclude: ['email', 'password', 'career', 'banner', 'birthdate', 'role_id', 'age'],
                include: [
                  [
                    sequelize.literal(`(
                      SELECT s.url
                      FROM storages AS s
                      WHERE s.id = avatar
                    )`),
                    'avatar'
                  ]
                ]
              },
              where: {
                id: { [Op.col]: 'places_ratings.user_id' }
              },
              // required: false
            },
          ]
        }
      ]
    })

    handleHttpSuccess(res, 'There you have the place and ratings', 200, place)
    return
  } catch (e) {
    console.log("Error in the places controller 'getPlaceById': ", e.message)
    handleHttpError(res, 'Error while getting the place')
    return
  }
}

const createRating = async (req, res) => {
  try {
    const { place_id, score, comment } = matchedData(req)

    const user = req.user

    const rating = await PlaceRatingModel.findOne({
      where: {
        user_id: user.id,
        place_id: place_id
      }
    })

    if (rating) {
      rating.set({
        score: score < 0 ? 0 : score > 5 ? 5 : score,
        comment: comment && comment,
      })

      await rating.save()

      handleHttpSuccess(res, 'Rating updated', 201, rating)
      return
    } else {
      const newRating = PlaceRatingModel.build({
        score: score < 0 ? 0 : score > 5 ? 5 : score,
        comment: comment && comment,
        place_id,
        user_id: user.id
      })

      await newRating.save()

      handleHttpSuccess(res, 'New rating added', 201, newRating)
      return
    }
  } catch (e) {
    console.log("Error in the places controller 'createRating': ", e.message)
    handleHttpError(res, 'Error while creating a rating')
    return
  }
}

module.exports = { getAllPlaces, getPlaceById, createRating }