const authenticationModule = require("express").Router()
const {getUserByEmail, postUser} = require("../models/authenticationModel")

const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

authenticationModule.post("/register", async(req, res) => {
    
    try {

        const {username, email, password} = req.body

        const existingUser = await getUserByEmail(email)
        if (!(existingUser.length === 0)){
            const error = new Error("User already exists")
            error.statusCode = 409
            throw error
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const createdUser = await postUser(username, email, hashedPassword, 
            (err) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ message: 'User registered successfully' });
            })

        res.status(201).json({
            success: true,
            message: "new user created successfully",
            data: createdUser
        })

    } catch (error) {
        throw error
    }

})

authenticationModule.post('/login', async (req, res) => {

    try {

        const { email, password } = req.body;

        const existingUser = await getUserByEmail(res, email)
        console.log(existingUser)

        if (existingUser.length === 0) return res.status(401).json({ error: 'User not found' })
        const user = existingUser[0]
        console.log(user)
        console.log(user.password)
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' })
    
        // Include the unique user ID in the JWT
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY, { expiresIn: '1h' })
        res.json({ token })

    } catch (error) {
        throw error
    }

});

module.exports = authenticationModule

// {
//     "username": "Sanjay S",
//     "email": "mail@gmail.com",
//     "password": "hi123"
// }

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJtYWlsQGdtYWlsLmNvbSIsImlhdCI6MTc1MjA3MjA1MiwiZXhwIjoxNzUyMDc1NjUyfQ.ZmEm0ATCGfDhD0SHQ_5l3uOjvQEBIONk7aykBs_Vkq4