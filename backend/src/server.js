require("dotenv").config()
const express = require("express")
const cors = require("cors")
const path = require("path");
const bodyParser = require("body-parser");
const { sequelize, dbConnect } = require("./config/database")
const { app, server } = require('./socket/socket')

// const app = express()

// const __dirname = path.resolve()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(express.static(path.join(__dirname, "../../frontend/dist")))
console.log(__dirname)


/*
* Here are the routes
*/

app.use('/api', require('./routes'))
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend", "dist", "index.html"))
})


const port = process.env.PORT || 3000

dbConnect()

server.listen(port, () => {
  console.log(`The app is ready and running on port http://localhost:${port}`)
})
