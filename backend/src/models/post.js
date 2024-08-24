const { sequelize } = require("../config/database")
const { DataTypes } = require("sequelize")
const User = require("./user")

const Post = sequelize.define(
  "posts",
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
    media_id: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.STRING,
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
    timesStamps: true,
  }
)

// Relationship
Post.belongsTo(User, { foreignKey: 'user_id' })
User.hasMany(Post, { foreignKey: 'user_id' })

module.exports = Post