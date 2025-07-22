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

async function getTimeslot(res) {

    try {

        const [time_slot] = await connection.query("select * from time_slot")
    
        res.status(200).json({
            success: true,
            data: time_slot
        })
        
    } catch (error) {
        
        if (error) return res.status(500).json({ error: error.message })

    }
    
}

async function postPoll(res, professor_id, course_code, timeslot_ids) {

    try {

        const [row] = (await connection.query("select course_id from courses where course_code = ?", [course_code]))[0]
        
        if(!row){
            return res.json({
                success: "failed",
                message: `This course (${course_code}) does not exist`
            })
        }
        const course_id = row.course_id

        const {insertId} = (await connection.query("insert into professorpolls (course_id, professor_id) values (?, ?)", [course_id, professor_id]))[0]
        const results = await connection.query("select * from professorpolls where poll_id = ?", [insertId])

            const [result] = results[0]
            const poll_id = result.poll_id
            console.log(result, poll_id, timeslot_ids)

            for (const timeslot_id of timeslot_ids) {
    
                console.log(timeslot_id)
                await connection.query("insert into polloptions (poll_id, timeslot_id) values (?, ?)", [poll_id, timeslot_id])
    
            }
        
        
    } catch (error) {
        
        if (error) return res.status(500).json({ error: error.message })

    }
    
}

async function updatePoll(res, poll_id,  professor_id, course_code, timeslot_ids) {

    try {

        // 1. Fetch the created_at timestamp from the database
    const [rows] = await db.query('SELECT created_at FROM your_table WHERE id = ?', [resourceId]);
    if (!rows.length) {
        return res.status(404).json({ error: 'Resource not found' });
    }

    const createdAt = new Date(rows[0].created_at);
    const now = new Date();

    // 2. Calculate time difference in milliseconds
    const diffMs = now - createdAt;

    // 15 minutes in milliseconds
    const fifteenMinutes = 15 * 60 * 1000;

    // 3. Check if within 15 minutes
    if (diffMs > fifteenMinutes) {
        return res.status(403).json({ error: 'PATCH allowed only within 15 minutes of creation' });
    }

    //4. Update logic
    const [row] = (await connection.query("select course_id from courses where course_code = ?", [course_code]))[0]
        
    if(!row){
        return res.json({
            success: "failed",
            message: `This course (${course_code}) does not exist`
        })
    }

    const course_id = row.course_id

    await connection.query("update professorpolls set course_id = ? where poll_id = ?", [course_id, poll_id], async (err, results) =>{

        if (!timeslot_ids) {
            return res.status(200).json({ message: "Update successful", data: results });
        }
        
        for (const timeslot_id in timeslot_ids) {

            await connection.query("delete from polloptions where poll_id = ?", [poll_id])
            await connection.query("insert into polloptions (poll_id, timeslot_id) values (?, ?)", [poll_id, timeslot_id])

        }
    })
        
    } catch (error) {
        
        if (error) return res.status(500).json({message: error.message})

    }

}

module.exports = { getTimeslot, postPoll, updatePoll }