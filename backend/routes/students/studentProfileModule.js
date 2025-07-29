// getting express
const express = require("express")

// Model
const { getProfile, updateProfile } = require("../../models/studentProfile")

// getting router
const studentProfile = express.Router()

studentProfile.get("profile", async (req, res) => {

    try {

        const student_id = req.user.payload.user_id
        await getProfile(res, student_id)
        
    } catch (error) {
        
        if (error) return res.status(500).json({message: error.message})

    }
    
})

studentProfile.patch("profile", async (req, res) => {

    try {

        const student_id = req.user.payload.user_id
        const {username, department, academic_year} = req.body
        await updateProfile(res, student_id, username, department, academic_year)
        
    } catch (error) {
        
        if (error) return res.status(500).json({message: error.message})

    }
    
})

module.exports = studentProfile