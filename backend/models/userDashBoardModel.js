// importing mysql2
const mysql = require("mysql2")
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });


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

async function displayTabels() {

    const [rows] = await connection.query('SHOW TABLES');
    // The column name will be 'Tables_in_<your_database_name>'
    // Let's extract just the table names:
    const tableNames = rows.map(row => Object.values(row)[0]);
    console.log(tableNames)
    
}
displayTabels()