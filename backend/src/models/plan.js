const { sequelize } = require("../config/database")
const { DataTypes } = require("sequelize")

const Plan = sequelize.define(
  "plans",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    timesStamps: false,
  }
)

module.exports = Plan