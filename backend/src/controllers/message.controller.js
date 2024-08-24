const { ChatModel, MessageModel } = require('../models')
const { matchedData } = require('express-validator')
const { handleHttpSuccess, handleHttpError } = require('../utils/handleResponse')
const { Op } = require('sequelize')
const { getRecieverSocketId, io } = require('../socket/socket')

const getMessages = async (req, res) => {
  try {
    // Protect with session
    const { id: userToChatId } = req.params
    const senderId = req.user.id

    let chat = await ChatModel.findOne({
      where: {
        [Op.or]: [
          {
            user1_id: senderId,
            user2_id: userToChatId
          },
          {
            user1_id: userToChatId,
            user2_id: senderId
          },
        ]
      }
    })

    if (!chat) {
      chat = await ChatModel.create({
        user1_id: senderId,
        user2_id: userToChatId
      })

      handleHttpSuccess(res, 'Data obtained', 200, [])
      return
    }

    // Bring the messages from Message model
    const messages = await MessageModel.findAll({
      where: { chat_id: chat.id }
    })

    handleHttpSuccess(res, 'Data obtained', 200, messages)
    return
  } catch (e) {
    handleHttpError(res, 'Error while trying to get messages', 500)
    return
  }
}

const sendMessage = async (req, res) => {
  try {
    // protect with session
    const { content, chat_id } = req.body
    const { id: recieverId } = req.params
    const senderId = req.user.id

    let chat = await ChatModel.findByPk(chat_id)

    if (!chat) {
      chat = await ChatModel.findOne({
        where: {
          [Op.or]: [
            {
              user1_id: senderId,
              user2_id: recieverId
            },
            {
              user1_id: recieverId,
              user2_id: senderId
            },
          ]
        }
      })
    }

    if (!chat) {
      chat = await ChatModel.create({
        user1_id: senderId,
        user2_id: recieverId
      })
    }

    const newMessage = MessageModel.build({
      content,
      chat_id: chat.id,
      sender_id: senderId,
      receiver_id: Number(recieverId)
    })

    await newMessage.save()

    // SOCKET here
    const receiverSocketId = getRecieverSocketId(recieverId)
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('newMessage', newMessage)
    }

    handleHttpSuccess(res, 'Message sent', 201, newMessage)
  } catch (e) {
    handleHttpError(res, 'Error while trying to send a message', 500)
    return
  }
}

module.exports = { getMessages, sendMessage }