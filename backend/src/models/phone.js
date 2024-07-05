const { sequelize } = require("../config/database")
const { DataTypes } = require("sequelize")
const Place = require("./place")

const Phone = sequelize.define(
  "phones",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    country_code: {
      type: DataTypes.STRING,
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    place_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Place,
        key: 'id'
      }
    }
  },
  {
    timeStamps: true
  }
)

// Relationship
Phone.belongsTo(Place, { foreignKey: 'place_id' })
Place.hasMany(Phone, { foreignKey: 'place_id' })

module.exports = Phone