const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const connectDB = require('./config/connectionDB')
const cors = require('cors')

const PORT = process.env.PORT || 3000
connectDB();
app.use(cors());
app.use(express.json());
app.use('/images', express.static('public/images'));
app.use('/videos', express.static('public/videos'));
app.get("/", (req, res) => {
    res.json({message: "hello"})
})

app.use("/recipe",require("./routers/recipe"))
app.use("/user",require("./routers/user"))

app.listen(PORT, (err) => {
    console.log(`app is listening on port ${PORT}`)
})