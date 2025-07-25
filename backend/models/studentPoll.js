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

async function getPoll(res, department) {

    try {

        const [rows] = await connection.query("select * from poll")
        
    } catch (error) {

        if (error) return res.status(500).json({message: error.message})
        
    }
    
}

async function studentVote(res, poll_id, student_id, option_id) {

    try {


        
    } catch (error) {
        
        if (error) return res.status(500).json({message: error.message})

    }
    
}

module.exports = { getPoll, studentVote }