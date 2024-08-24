const { sequelize } = require("../config/database")
const { DataTypes } = require("sequelize")

const Storage = sequelize.define(
  "storages",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    timesStamps: false,
  }
)

module.exports = Storage