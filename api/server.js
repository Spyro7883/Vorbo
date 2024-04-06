require("dotenv").config()
const express = require('express')
const next = require('next')
const mysql = require('mysql')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

connection.connect()

connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
    if (err) throw err

    console.log('The solution is: ', rows[0].solution)
})

connection.end()

app.prepare()
    .then(() => {
        const server = express()

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