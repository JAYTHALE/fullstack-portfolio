const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
require("dotenv").config()

const app = express()

//middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }))
app.use(cookieParser())
app.use(express.json())

app.use("/api/auth", require('./routes/auth.routes'))


app.use("*", (req, res) => {
    res.status(404).json({ message: "Resource Not Found" })
})
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message: `server error${err.message}` })
})
mongoose.connect(process.env.MONGO_URL)
mongoose.connection.once("open", () => {
    console.log("MONGOOSE CONNECTED")
    app.listen(process.env.PORT, console.log("Server Runing"))
})
