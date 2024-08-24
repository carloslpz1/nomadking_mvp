const { sequelize } = require('../config/database')
const { DataTypes } = require('sequelize')
const User = require('./user')
const TransactionType = require('./transactionType')

const Transaction = sequelize.define(
  "transactions",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    },
    type: {
      type: DataTypes.INTEGER,
      references: {
        model: TransactionType,
        key: 'id'
      }
    }
  },
  {
    timeStamps: true
  }
)

// Relationship
Transaction.belongsTo(User, { foreignKey: 'user_id' })
User.hasMany(Transaction, { foreignKey: 'user_id' })

Transaction.belongsTo(TransactionType, { foreignKey: 'type' })
TransactionType.hasMany(Transaction, { foreignKey: 'type' })

module.exports = Transaction