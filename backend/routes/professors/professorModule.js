// express
const express = require("express")

// router
const professorModule = express().router

// models
const { getTimeslot, postPoll, updatePoll } = require("../../models/profressorPoll")

// routes
professorModule.get("/poll", async(req, res) => {
    
    await getTimeslot(res)

})

professorModule.post("/poll", async(req, res) => {
    
    const professor_id = req.user.payload.user_id
    const {course_code, timeslot_ids} = req.body
    await postPoll(res, professor_id, course_code, timeslot_ids)

})

professorModule.patch("/poll", async(req, res) => {
    
    const professor_id = req.user.payload.user_id
    const {course_code, timeslot_ids, poll_id} = req.body
    await updatePoll(res, poll_id,  professor_id, course_code, timeslot_ids)

})

professorModule.delete("/poll", async(req, res) => {
    
    await getTimeslot(res)

})

module.exports = professorModule