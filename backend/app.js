// basic setup
const express = require("express")
const cors = require("cors")
require("dotenv").config()

// importing modules
const authenticationModule = require("./routes/authentication/authenticationModule")
const authenticateJWT = require("./routes/authentication/authenticateJWT")
const authorizeRoles = require("./routes/authentication/authorizeModule")
const studentEnrollmentModule = require("./routes/students/studentEnrollmentModule")
const professorModule = require("./routes/professors/professorModule")

// creating app 
const app = express()

// middlewares
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// authenticationModule
app.use("/", authenticationModule)

// modules
app.use("/student/", authenticateJWT, authorizeRoles('student'), studentEnrollmentModule)
app.use("/professor/", authenticateJWT, authorizeRoles('professor'), professorModule)
// app.use("/admin/", authenticateJWT, authorizeRoles('admin'), userDashBoardModule)

// listening to PORT 3000
app.listen(process.env.PORT, () => {

    console.log("listenng to PORT: ", process.env.PORT)

})