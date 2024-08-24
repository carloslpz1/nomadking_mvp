const { sequelize } = require("../config/database")
const { DataTypes } = require("sequelize")
const User = require("./user")
const Post = require("./post")

const Like = sequelize.define(
  "likes",
  {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    },
    post_id: {
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
Like.belongsTo(User, { foreignKey: 'user_id' })
User.hasMany(Like, { foreignKey: 'user_id' })

Like.belongsTo(Post, { foreignKey: 'post_id' })
Post.hasMany(Like, { foreignKey: 'post_id' })

module.exports = Like