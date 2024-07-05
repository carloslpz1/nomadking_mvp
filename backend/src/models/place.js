const { sequelize } = require("../config/database")
const { DataTypes } = require("sequelize")
const Address = require("./address")

const Place = sequelize.define(
  "places",
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
      type: DataTypes.TEXT,
    },
    score_avg: {
      type: DataTypes.FLOAT,
    },
    op_hours: {
      type: DataTypes.STRING,
    },
    internet_qua: {
      type: DataTypes.ENUM(['excellent', 'good', 'regular', 'poor', 'bad'])
    },
    address_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Address,
        key: 'id'
      }
    }
  },
  {
    timeStamps: true
  }
)

// Relationship
Place.belongsTo(Address, { foreignKey: 'address_id' })
Address.hasMany(Place, { foreignKey: 'address_id' })

module.exports = Place