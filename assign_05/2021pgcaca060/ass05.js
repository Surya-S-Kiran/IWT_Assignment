const express = require('express');
const path = require("path");
const helmet = require("helmet");
const cookieParser = require('cookie-parser');
const con = require("./DBconection");

const fs = require('fs')
const root = __dirname;
const app = express()
const log = console.log;

const bodyParser = require("body-parser")

app.use(helmet());
app.use(cookieParser());
app.set("view engine", "ejs");
app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "public")));
app.set("view engine", "ejs");

// render the ejs views
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));



app.get('/', (req, res) => {
    res.sendFile(root + '/main.html')
})

app.get('/register', (req, res) => {
    res.sendFile(root + '/register.html')
})

app.get('/loginpage', (req, res) => {
    res.sendFile(root + '/loginpage.html')
})

app.post("/register", (req, res) => {
    const { name, email, password } = req.body;
    const mysql_query = `insert into mydata values("${name}","${email}","${password}")`;

    con.query(mysql_query, (err, result, fields) => {
        if (err) {
            console.log(err);
            res.sendFile(root + '/register.html')
        }
        else {
            console.log(result);
            res.sendFile(root + '/loginpage.html');
        }
    })
});

app.post("/loginpage", (req, res) => {
    const { email, password } = req.body;

    const mysql_query = `select * from mydata where email = "${email}" and password="${password}"`;
    con.query(mysql_query, (err, result, fields) => {
        if (err) {
            console.log(err);
            return;
        }
        else if (result.length == 1) {
            res.send(`<h1>Welcome ${result[0].name}
            <form >
            <button type="submit">Logout</button>
            <a href="/main.html"></a>
        </form>
            `
            );
            res.sendFile(root + '/logout.html');
        }
        else {
            res.send(`<p>Invalid login credentials</p>
            <form action="/register" method="GET">
        <button type="submit">Register</button>
    </form>
    <form action="/loginpage" method="GET">
        <button type="submit">Login</button>
    </form>`)
        }
    })
})

app.listen(3000, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("running at 3000");
    }
});

