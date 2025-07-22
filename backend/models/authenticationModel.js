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

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

async function getUserByEmail(res, email){
  try {
    
    const [rows] = await connection.query("select * from user where email = ?", [email])

    console.log(rows)
    if (!(rows.length === 0)) {
      const role = rows[0].role
      
        if (role === "professor") {

          const [rows] = await connection.query("select * from professors where email = ?", [email])
          return {
            existingUser: rows,
            role: role
          }
      
        } else if (role === "student"){

          const [rows] = await connection.query("select * from students where email = ?", [email])
          return {
            existingUser: rows,
            role: role
          }

          
        } else if (role === "admin") {
      
          const [rows] = await connection.query("select * from admins where email = ?", [email]) 
          return {
            existingUser: rows,
            role: role
          }

        }
      }

      return {
            existingUser: false,
            role: null
          }

    } catch (error) {

      if (error) return res.status(500).json({ error: error.message })

    }
}

async function postUser(res, name, email, password_hash, role) {
  try {

    
    if (role === "professor") {
      
      await connection.query("Insert into professors (name, email, password_hash) values (?, ?, ?)", [name, email, password_hash]) 

    } else if (role === "student"){
      
      connection.query("Insert into students (name, email, password_hash) values (?, ?, ?)", [name, email, password_hash]) 
      
    } else if (role === "admin") {
      
      await connection.query("Insert into admins (name, email, password_hash) values (?, ?, ?)", [name, email, password_hash]) 

    }
    
    await connection.query("Insert into user (name, email, password_hash, role) values (?, ?, ?, ?)", [name, email, password_hash, role])

    role = role + "s"

    const [rows] = await connection.query("select * from ? where email = ?", [role, email])
    return rows

  } catch (error) {

    if (error) {
      
      res.status(500).json({ error: error.message })
      return null
    
    }

  }
}

module.exports = {getUserByEmail, postUser}