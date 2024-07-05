const { sequelize } = require("../config/database")
const { DataTypes } = require("sequelize")
const User = require("./user")
const Post = require("./post")

const Comment = sequelize.define(
  "comments",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
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
Comment.belongsTo(User, { foreignKey: 'user_id' })
User.hasMany(Comment, { foreignKey: 'user_id' })

Comment.belongsTo(Post, { foreignKey: 'post_id' })
Post.hasMany(Comment, { foreignKey: 'post_id' })

module.exports = Comment