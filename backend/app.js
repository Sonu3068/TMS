// basic setup
const express = require("express")
require("dotenv").config()
const cors = require('cors');



// importing modules
const userDashBoardModule = require("./modules/studentModule")
const authenticationModule = require("./modules/authenticationModule")
const authenticateJWT = require("./modules/authenticateJWT")
const authorizeRoles = require("./modules/authorizeModule")

// creating app 
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get("/", (req, res) => {
    res.send("bye bye ")
    console.log("jdkbsb")
})
// Allow requests from any origin (for development)
app.use(cors());

// or, to allow only your frontend domain:
app.use(cors({
  origin: 'http://localhost:3000' // or your frontend URL
}));

// Your other middleware and routes
// authenticationModule
app.use("/authentication", authenticationModule)

// modules
app.use("/student/", authenticateJWT, authorizeRoles('student'), userDashBoardModule)
app.use("/professor/", authenticateJWT, authorizeRoles('professor'), userDashBoardModule)
app.use("/admin/", authenticateJWT, authorizeRoles('admin'), userDashBoardModule)

// listening to PORT 3000
app.listen(process.env.PORT, () => {
    console.log("listenng to PORT: ", process.env.PORT)
})
