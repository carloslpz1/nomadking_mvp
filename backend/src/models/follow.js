const { sequelize } = require("../config/database")
const { DataTypes } = require("sequelize")
const User = require("./user")

const Follow = sequelize.define(
  "follows",
  {
    follower_user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    },
    followed_user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Post,
        key: 'id'
      }
    }
  },
  {
    timesStamps: true,
  }
)

// Relationship
Follow.belongsTo(User, { foreignKey: 'follower_user_id' })
User.hasMany(Follow, { foreignKey: 'follower_user_id' })

Follow.belongsTo(User, { foreignKey: 'followed_user_id' })
User.hasMany(Follow, { foreignKey: 'followed_user_id' })

module.exports = Follow