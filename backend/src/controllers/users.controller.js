const userModel = require('../models/user')
const { handleHttpError } = require('../utils/handleError')

const getUser = (req, res) => {

}

const getUsers = async (req, res) => {
  try {
    const data = await userModel.findAll({})

    res.send({ data })
  } catch (e) {
    handleHttpError(res, 'Error with getting the USERS')
  }
}

const createUser = async (req, res) => {
  const { body } = req
  console.log(body)
  const data = await userModel.create(body)
  res.send(data)
}

const updateUser = (req, res) => { }
const deleteUser = (req, res) => { }

module.exports = { getUser, getUsers, createUser, updateUser, deleteUser }