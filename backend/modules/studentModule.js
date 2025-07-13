// getting express
const express = require("express")

// Model
const { fetchCourses, postEnrollment } = require("../models/enrollementModel")

// getting router
const userDashBoardModule = express.Router()

userDashBoardModule.get("/enrollment", async (req, res)=> {

    // const {dept} = req.
    const use = req.user

    const courses = await fetchCourses(res, req.body.dept)
    res.status(200).send(courses)

})

userDashBoardModule.get("/:id", (req, res)=> {

    const id = req.params.id
    console.log(id)
    res.send(`getting the users data of id: ${id}`)

})

userDashBoardModule.post("/enrollment", async (req, res)=> {

    const student_id = req.user.payload.user_id
    const {course_code} = req.body

    await postEnrollment(res, student_id, course_code)

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