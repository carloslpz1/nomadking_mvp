require("dotenv").config()
const express = require("express")
const cors = require("cors")
const path = require("path");
const bodyParser = require("body-parser");
const { sequelize, dbConnect } = require("./config/database")

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

/*
 * Here are the routes
 */

app.use('/api', require('./routes'))


const port = process.env.PORT || 3000

dbConnect()

app.listen(port, () => {
  console.log(`The app is ready and running on port http://localhost:${port}`)
})
