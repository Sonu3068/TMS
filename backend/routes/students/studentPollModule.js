// getting express
const express = require("express")

// Model
const {getPoll, studentVote } = require("../../models/studentPoll")

// getting router
const studentPoll = express.Router()

studentPoll.get("/poll", async(req, res) => {

    try {

        const department = req.body.dept
        await getPoll(res, department)
        
    } catch (error) {
        
        if (error) return res.status(500).json({message: error.message})

    }

})

studentPoll.post("vote", async(req, res) => {

    try {

        const [poll_id, option_id] = req.body
        const student_id = req.user.payload.user_id
        await studentVote(res, poll_id, student_id, option_id)
        
    } catch (error) {
        
        if (error) return res.status(500).json({message: error.message})

    }

}

module.exports = studentPoll