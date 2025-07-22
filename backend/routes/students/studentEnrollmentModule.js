// getting express
const express = require("express")

// Model
const { fetchCourses, postEnrollment, deleteEnrolledCourses, enrolledCourses} = require("../../models/enrollementModel")

// getting router
const studentEnrollmentModule = express.Router()

// get courses
studentEnrollmentModule.get("/courses", async (req, res)=> {
    
    const department = req.body.dept
    await fetchCourses(res, department)
    
})

// get enrolled courses
studentEnrollmentModule.get("/enrollment", async (req, res)=> {

    const student_id = req.user.payload.user_id
    await enrolledCourses(res, student_id)

})

// add courses to enrollment list
studentEnrollmentModule.post("/enrollment", async (req, res)=> {

    const student_id = req.user.payload.user_id
    const {course_code} = req.body

    await postEnrollment(res, student_id, course_code)

})


// remove course from enrollment list
studentEnrollmentModule.delete("/enrollment", async (req, res)=> {

    const student_id = req.user.payload.user_id
    const {course_code} = req.body
    await deleteEnrolledCourses(res, student_id, course_code)

})


module.exports = studentEnrollmentModule