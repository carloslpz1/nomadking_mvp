const { sequelize } = require("../config/database")
const { DataTypes } = require("sequelize")

const Role = sequelize.define(
  "roles",
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
      type: DataTypes.STRING,
    }
  },
  {
    timesStamps: false,
  }
)

module.exports = Role