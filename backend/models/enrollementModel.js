// importing mysql2
const assert = require("assert");
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

async function fetchCourses(res, dept) {

    try {

        const [rows] = await connection.query("select * from courses")
        const courses = rows.filter((row) => {
            return row.course_code.split("-")[0] === `${dept}`
        })

        return courses

    } catch (error) {

        if (error) return res.status(500).json({ error: error.message })

    }

}

async function postEnrollment(res, student_id, course_code) {

    try {

        const [row] = (await connection.query("select course_id from courses where course_code = ?", [course_code]))[0]
        
        if(!row){
            return res.json({
                success: "failed",
                message: `This course (${course_code}) does not exist`
            })
        }
        const course_id = row.course_id
        
        const [existingCourse] = await connection.query("select * from enrollments where student_id = ? and course_id = ?", [student_id, course_id])
        console.log(existingCourse)
        if(!(existingCourse.length === 0)){

            return res.json({
                success: "failed",
                message: `This course (${course_code}) is already chosen by this student`
            })
            
        }

        await connection.query("insert into enrollments (student_id, course_id) values (?, ?)", [student_id, course_id])
        const [rows] = await connection.query("select * from enrollments where student_id = ?", [student_id])

        return res.status(201).json({
            success: "success",
            data: rows
        })

    } catch (error) {

        if (error) return res.status(500).json({ error: error.message })

    }
    
}

module.exports = {fetchCourses, postEnrollment}