const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql2')
const path = require('path')
const app = express()


// mysql section

const database = mysql.createConnection({
        user: 'root',
        password: 'root',
        host: 'localhost',
        database: 'student'
})

// ----------------


// user variables
const log = console.log
const root = __dirname
// path.resolve()

// middleware
// app.use(bodyParser.urlencoded())
app.use(bodyParser.urlencoded({extended: true}))
// app.use(express.urlencoded({extended: true}))


// log(path.resolve('/index.js'))

// app.listen()
app.listen(9090, (err) => {
        log('listening on 9090')
})

/*
        createServer(){

                if(req.url == '/'){
                        //code here..
                }
        }
*/

// get request here
app.get('/', (req, res) => {
        // res.write()
        // res.send() 
        // res.sendFile

        res.sendFile(root +'/index.html')
        // log('hitted')

        // res.send('get request httted')
})

// app.get('/about', (req, res) => {
//         res.sendFile(root + '/index.html')
// })



// app.get('/loguser', (req, res) => {

//         log(req.query.username)
// })

// // post request here
// app.post('/', (req, res) => {
//         res.send('post request hittted')
// })

app.post('/loguser', (req, res) => {
        let username = req.body.username
        let password = req.body.password
        log(username,password)
        const query = 'insert into user values(`${username}`, `${password}`)'

        // log(req.body.username)
        // log(req.body.password)

        database.connect()
        database.query(query, (err, result, tuple) => {
                log(err)
        })

        database.end()
})




