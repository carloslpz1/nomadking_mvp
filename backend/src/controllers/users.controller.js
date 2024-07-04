const userModel = require('../models/user')

const getUser = (req, res) => {

}

const getUsers = async (req, res) => {
  const data = await userModel.findAll({})

  res.send({ data })
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