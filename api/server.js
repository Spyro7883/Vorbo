require('dotenv').config();
require('dotenv').config({ path: `./.env.${process.env.NODE_ENV}` });
const express = require('express')
const mysql = require('mysql')
const bcrypt = require('bcrypt')
const cors = require('cors');

const app = express();

const db = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
})
db.getConnection((err, connection) => {
    if (err) throw (err)
    console.log("DB connected successful: " + connection.threadId)
})


app.use(cors({}));
app.use(express.json())

app.post("/api/proxy", async (req, res) => {
    const username = req.body.name;
    const email = req.body.email;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    db.getConnection(async (err, connection) => {
        if (err) throw (err)
        const sqlSearch = "SELECT * FROM user_table WHERE username = ?"
        const search_query = mysql.format(sqlSearch, [username])
        const sqlInsert = "INSERT INTO user_table (username, email, password) VALUES (?,?,?)"
        const insert_query = mysql.format(sqlInsert, [username, email, hashedPassword])
        await connection.query(search_query, async (err, result) => {
            if (err) throw (err)
            console.log("Search Results")
            console.log(result.length)
            if (result.length != 0) {
                connection.release()
                console.log("User already exists")
                res.sendStatus(409)
            }
            else {
                await connection.query(insert_query, (err, result) => {
                    connection.release()
                    if (err) throw (err)
                    console.log("Created new User")
                    console.log(result.insertId)
                    res.sendStatus(201)
                })
            }
        })
    })
})
app.get('/a/:id', (req, res) => {
    const actualPage = '/user'
    const queryParams = { id: req.params.id }
    app.render(req, res, actualPage, queryParams)
})

app.listen(process.env.NEXT_PUBLIC_PORT, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${process.env.NEXT_PUBLIC_PORT}`)
})  