const { sequelize } = require("../config/database")
const { DataTypes } = require("sequelize")
const Role = require("./role")
const Storage = require("./storage")

const User = sequelize.define(
  "users",
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
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.INTEGER,
      // references: {
      //   model: Storage,
      //   key: 'id'
      // },
    },
    banner: {
      type: DataTypes.INTEGER,
    },
    birthdate: {
      type: DataTypes.DATEONLY,
    },
    age: {
      type: DataTypes.VIRTUAL,
      get() {
        const birthdate = this.getDataValue('birthdate')
        if (birthdate) {
          const today = new Date()
          const birthdateObj = new Date(birthdate)

          let age = today.getFullYear() - birthdateObj.getFullYear()
          const month = today.getMonth() - birthdateObj.getMonth()

          if (month < 0 || (month === 0 && today.getDate() < birthdateObj.getDate())) {
            age--
          }

          return age
        } else {
          return null
        }
      }
    },
    account_type: {
      type: DataTypes.ENUM(['free', 'premium']),
      defaultValue: 'free',
    },
    role_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Role,
        key: 'id'
      },
      defaultValue: 1,
    }
  },
  {
    timesStamps: true,
  }
)

// Relationship
User.belongsTo(Role, { foreignKey: 'role_id' })
Role.hasMany(User, { foreignKey: 'role_id' })

module.exports = User