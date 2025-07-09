// importing mysql2
const { copyFileSync } = require("fs")
const mysql = require("mysql2")
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') })


// creating connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
}).promise()

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

async function getUserByEmail(res, email){
  try {
    
      const [rows] = await connection.query("select * from users where email = ?", [email])
      return rows

    } catch (error) {
      if (error) return res.status(500).json({ error: error.message })
    }
}

async function postUser(username, email, password, callback) {
    await connection.query("Insert into users (username, email, password) values (?, ?, ?)", [username, email, password], callback) 
    const [rows] = await connection.query("select * from users where email = ?", [email])
    return rows
}

module.exports = {getUserByEmail, postUser}