require("dotenv").config()
const express = require('express')
const next = require('next')
const mysql = require('mysql')
const bcrypt = require('bcrypt')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

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

app.prepare()
    .then(() => {
        const server = express()

        server.use(express.json())

        server.post("/createUser", async (req, res) => {
            const user = req.body.name;
            const email = req.body.email;
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            db.getConnection(async (err, connection) => {
                if (err) throw (err)
                const sqlSearch = "SELECT * FROM user_table WHERE user = ?"
                const search_query = mysql.format(sqlSearch, [user])
                const sqlInsert = "INSERT INTO user_table VALUES (0,?,?,?)"
                const insert_query = mysql.format(sqlInsert, [user, email, hashedPassword])
                await connection.query(search_query, async (err, result) => {
                    if (err) throw (err)
                    console.log("------> Search Results")
                    console.log(result.length)
                    if (result.length != 0) {
                        connection.release()
                        console.log("------> User already exists")
                        res.sendStatus(409)
                    }
                    else {
                        await connection.query(insert_query, (err, result) => {
                            connection.release()
                            if (err) throw (err)
                            console.log("--------> Created new User")
                            console.log(result.insertId)
                            res.sendStatus(201)
                        })
                    }
                })
            })
        })
        server.get('/a/:id', (req, res) => {
            const actualPage = '/user'
            const queryParams = { id: req.params.id }
            app.render(req, res, actualPage, queryParams)
        })

        server.get('*', (req, res) => {
            return handle(req, res)
        })

        server.listen(process.env.PORT, (err) => {
            if (err) throw err
            console.log(`> Ready on http://localhost:${process.env.PORT}`)
        })
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })