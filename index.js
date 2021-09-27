const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(cors())

require("dotenv/config")

mongoose
  .connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(5000)
    console.log("App is connected to MongoDB, listening on port 5000")
  })
  .catch((err) => console.log("Error connecting to MongoDB.", err))

const userRoutes = require("./src/routes/userRoute")
app.use(userRoutes)

const messageRoutes = require("./src/routes/messageRoute")
app.use(messageRoutes)
