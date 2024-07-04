const mysql = require('./mysql')
const sqlite = require('./sqlite')

let sequelize = null

const environment = process.env.ENV || 'production'
if (environment === 'production') {
  sequelize = mysql
} else if (environment === 'development') {
  sequelize = sqlite
} else {
  sequelize = sqlite
}

const dbConnect = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connection to database established')

    sequelize.sync()
      .then(() => {
        console.log('Database & tables created!')
      })
      .catch(e => {
        console.error('There was an error trying to sync the DB', e)
      })
  } catch (e) {
    console.log('Error with the database connection', e)
  }
}

module.exports = { sequelize, dbConnect }