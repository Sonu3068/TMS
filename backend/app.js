// basic setup
const express = require("express")
require("dotenv").config()

// importing modules
const userDashBoardModule = require("./modules/userDashBoardModule")

// creating app 
const app = express()

// modules
app.get("/", () => {
    console.log("hi hi")
})
app.use("/user/Dashboard/", userDashBoardModule)

// listening to PORT 3000
app.listen(process.env.PORT, () => {
    console.log("listenng to PORT: ", process.env.PORT)
})