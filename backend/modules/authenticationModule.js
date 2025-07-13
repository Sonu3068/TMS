const express = require("express")
const authenticationModule = express.Router()
const {getUserByEmail, postUser} = require("../models/authenticationModel")

const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")


require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

authenticationModule.post("/register", async(req, res) => {
    
    try {

        const {username, email, password, role } = req.body

        const existingUser = await getUserByEmail(res, email)
        if (!(existingUser.length === 0)){
            const error = new Error("User already exists")
            error.statusCode = 409
            throw error
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const createdUser = await postUser(res, username, email, hashedPassword, role)

        if (createdUser) {

            res.status(201).json({
                success: true,
                message: "new user created successfully",
                data: createdUser
            })

        }

    } catch (error) {

        throw error

    }

})

authenticationModule.post('/login', async (req, res) => {

    try {

        const { email, password } = req.body;

        const { role, existingUser} = await getUserByEmail(res, email)

        if (existingUser.length === 0) return res.status(401).json({ error: 'User not found' })
        const user = existingUser[0]

        const idFieldMap = {

            student: 'student_id',
            professor: 'professor_id',
            admin: 'admin_id'

        }
        const idField = idFieldMap[role];
        const user_id = user[idField]

        const isMatch = await bcrypt.compare(password, user.password_hash)
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' })
    
        // Include the unique user ID in the JWT
        const payload = {
            user_id: user_id,
            name: user.name,
            email: user.email,
            role: role,
        }
        console.log(payload)
        const token = jwt.sign({payload: payload}, process.env.SECRET_KEY, { expiresIn: '1h' })
        return res.json({
            token,
            role: role
        })

    } catch (error) {

        throw error

    }

});

module.exports = authenticationModule
