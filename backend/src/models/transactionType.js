const { sequelize } = require('../config/database')
const { DataTypes } = require('sequelize')

const TransactionType = sequelize.define(
  "transaction_types",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    timeStamps: false
  }
)

module.exports = TransactionType