// getting express
const express = require("express")

// Model
const { getProfile, updateProfile } = require("../../models/professorProfile")

// getting router
const professorProfile = express.Router()

professorProfile.get("profile", async (req, res) => {

    try {

        const professor_id = req.user.payload.user_id
        await getProfile(res, professor_id)
        
    } catch (error) {
        
        if (error) return res.status(500).json({message: error.message})

    }
    
})

professorProfile.patch("profile", async (req, res) => {

    try {

        const professor_id = req.user.payload.user_id
        const {} = req.body
        await updateProfile(res, professor_id)
        
    } catch (error) {
        
        if (error) return res.status(500).json({message: error.message})

    }
    
})

module.exports = professorProfile