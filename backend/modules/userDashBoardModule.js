// getting express
const express = require("express")

// getting router
const userDashBoardModule = express.Router()

userDashBoardModule.get("/", (req, res)=> {

    res.send("getting all the users data")

})

userDashBoardModule.get("/:id", (req, res)=> {

    const id = req.params.id
    console.log(id)
    res.send(`getting the users data of id: ${id}`)

})

userDashBoardModule.post("/:id", (req, res)=> {

    const id = req.params.id
    res.send(`posting the users data of id: ${id}`)

})

userDashBoardModule.patch("/:id", (req, res)=> {

    const id = req.params.id
    res.send(`updating the users data of id: ${id}`)

})

userDashBoardModule.delete("/:id", (req, res)=> {

    const id = req.params.id
    res.send(`deleteing the users data of id: ${id}`)

})

module.exports = userDashBoardModule