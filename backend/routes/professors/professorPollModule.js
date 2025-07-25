// express
const express = require("express")

// router
const professorPollModule = express().router

// models
const { getTimeslot, postPoll, updatePoll, deletePoll} = require("../../models/profressorPoll")

// routes
professorPollModule.get("/poll", async(req, res) => {
    
    await getTimeslot(res)

})

professorPollModule.post("/poll", async(req, res) => {
    
    const professor_id = req.user.payload.user_id
    const {course_code, timeslot_ids} = req.body
    await postPoll(res, professor_id, course_code, timeslot_ids)

})

professorPollModule.patch("/poll", async(req, res) => {
    
    const professor_id = req.user.payload.user_id
    const {course_code, timeslot_ids, poll_id} = req.body
    await updatePoll(res, poll_id,  professor_id, course_code, timeslot_ids)

})

professorPollModule.delete("/poll", async(req, res) => {
    
    const professor_id = req.user.payload.user_id
    const {poll_id} = req.body
    await deletePoll(res, poll_id, professor_id)

})

module.exports = professorPollModule