// basic setup
const express = require("express")
require("dotenv").config()

// importing modules
const userDashBoardModule = require("./modules/userDashBoardModule")
const authenticationModule = require("./modules/authenticationModule")
const authorizeToken = require("./modules/authorizationModule")

// creating app 
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get("/", (req, res) => {
    res.send("bye bye ")
    console.log("jdkbsb")
})
// authenticationModule
app.use("/authentication", authenticationModule)

// modules
app.use("/user/Dashboard/", authorizeToken, userDashBoardModule)

// listening to PORT 3000
app.listen(process.env.PORT, () => {
    console.log("listenng to PORT: ", process.env.PORT)
})