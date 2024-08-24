const { sequelize } = require("../config/database")
const { DataTypes } = require("sequelize")
const Plan = require("./plan")
const User = require("./user")

const Subscription = sequelize.define(
  "subscriptions",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    },
    plan_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Plan,
        key: 'id'
      }
    },
  },
  {
    timesStamps: false,
  }
)

// Relationship
Subscription.belongsTo(User, { foreignKey: 'user_id' })
User.hasOne(Subscription, { foreignKey: 'user_id' })

Subscription.belongsTo(Plan, { foreignKey: 'plan_id' })
Plan.hasMany(Subscription, { foreignKey: 'plan_id' })

module.exports = Subscription