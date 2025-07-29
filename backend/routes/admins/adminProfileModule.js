// getting express
const express = require("express")

// Model
const { getProfile, updateProfile } = require("../../models/adminProfile")

// getting router
const adminProfile = express.Router()

adminProfile.get("profile", async (req, res) => {

    try {

        const professor_id = req.user.payload.user_id
        await getProfile(res, professor_id)
        
    } catch (error) {
        
        if (error) return res.status(500).json({message: error.message})

    }
    
})

adminProfile.patch("profile", async (req, res) => {

    try {

        const admin_id = req.user.payload.user_id
        const {username} = req.body
        await updateProfile(res, admin_id, username)
        
    } catch (error) {
        
        if (error) return res.status(500).json({message: error.message})

    }
    
})

module.exports = adminProfile