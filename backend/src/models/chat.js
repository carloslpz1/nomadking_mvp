const { sequelize } = require('../config/database')
const { DataTypes } = require('sequelize')
const User = require('./user')

const Chat = sequelize.define("chats",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user1_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    },
    user2_id: {
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
Chat.belongsTo(User, { foreignKey: 'user1_id' })
User.hasMany(Chat, { foreignKey: 'user1_id' })

Chat.belongsTo(User, { foreignKey: 'user2_id' })
User.hasMany(Chat, { foreignKey: 'user2_id' })

module.exports = Chat