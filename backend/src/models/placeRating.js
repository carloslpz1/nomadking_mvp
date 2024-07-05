const { sequelize } = require("../config/database")
const { DataTypes } = require("sequelize")
const Place = require("./place")
const User = require("./user")

const PlaceRating = sequelize.define(
  "places_ratings",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
    },
    place_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Place,
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    }
  },
  {
    timeStamps: true,
  }
)

// Relationship
PlaceRating.belongsTo(Place, { foreignKey: 'place_id' })
Place.hasMany(PlaceRating, { foreignKey: 'place_id' })

PlaceRating.belongsTo(User, { foreignKey: 'user_id' })
User.hasMany(PlaceRating, { foreignKey: 'user_id' })

module.exports = PlaceRating