const { sequelize } = require('../config/database')
const { DataTypes } = require('sequelize')
const User = require('./user')
const Chat = require('./chat')

const Message = sequelize.define("messages",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    chat_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Chat,
        key: 'id'
      }
    },
    sender_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    },
    receiver_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    }
  },
  {
    timesStamps: true,
  }
)

// Relationship
Message.belongsTo(Chat, { foreignKey: 'chat_id' })
Chat.hasMany(Message, { foreignKey: 'chat_id' })

Message.belongsTo(User, { foreignKey: 'sender_id' })
User.hasMany(Message, { foreignKey: 'sender_id' })

Message.belongsTo(User, { foreignKey: 'receiver_id' })
User.hasMany(Message, { foreignKey: 'receiver_id' })

module.exports = Message