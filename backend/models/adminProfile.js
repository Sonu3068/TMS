// importing mysql2
const mysql = require("mysql2")
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') })


// creating connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
}).promise()

async function getProfile (res, admin_id) {

    try {

        const [rows] = await connection.query("select * from admins where admin_id = ?", [admin_id])
        const profile = rows[0]
        
        res.status(200).json({
            success: true,
            message: "Professor data is fetched",
            data: profile
        })

    } catch (error) {

        if (error) return res.status(500).json({message: error.message})
        
    }

}

async function updateProfile (res, admin_id, username) {

    try {

        const [rows] = await connection.query("select * from admins where admin_id = ?", [admin_id])
        const existingProfile = rows[0]

        if(!existingProfile){
            return res.status(404).json({
                success: false,
                message: "Professor ID doesn't exist",
            })
        }

        await connection.query("update table admins set name = ?", [username])
        
        const [profile] = (await connection.query("select * from admins where admin_id = ?", [admin_id]))[0]

        res.status(200).json({
            success: true,
            message: "Professor data is updated",
            data: profile
        })

    } catch (error) {

        if (error) return res.status(500).json({message: error.message})
        
    }

}

module.exports = { getProfile, updateProfile }