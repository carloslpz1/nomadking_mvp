const { Sequelize } = require("sequelize")
const { SqliteDialect } = require("@sequelize/sqlite3")

const sequelize = new Sequelize(
  {
    dialect: "sqlite",
    storage: './src/db/database.sqlite',
    pool: { max: 1, idle: Infinity, maxUses: Infinity },
    foreignKeys: true,
    logging: false,
  }
)

module.exports = sequelize