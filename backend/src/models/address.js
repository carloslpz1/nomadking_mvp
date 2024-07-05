const { sequelize } = require("../config/database")
const { DataTypes } = require("sequelize")

const Address = sequelize.define(
  "addresses",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    timeStamps: false
  }
)

module.exports = Address