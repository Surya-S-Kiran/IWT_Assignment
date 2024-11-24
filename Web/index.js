const express = require('express');
const cookieParser = require('cookie-parser');
const dbaccess = require('./dbaccess');
const e = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get("/", (req, res) => {
    res.clearCookie('email');
    res.sendFile(__dirname + "/register.html");
});

app.post("/register", (req, res) => {
    user = {};
    user.name = req.body.name;
    user.password = req.body.passwd;
    user.email = req.body.email;
    user.contact = req.body.contact;

    dbaccess.insertDB(user);
});
//app 

app.get("/login", (req, res) => {
    const email = req.cookies.email;
    if(email === undefined)
        res.sendFile(__dirname + "/login.html");
    else {
        console.log(email);
        user = {email: email};
        dbaccess.reloginUser(user, res);
    }
});

app.post("/check_user", (req, res) => {
    const email = req.body.email;
    if(email === undefined)
        res.end("");
    else {
        user = {email: email};
        dbaccess.checkUser(user, res);
    }

});

app.post("/process_login", (req, res) => {
    user = {};
    user.email = req.body.email;
    user.password = req.body.passwd;

    let result = dbaccess.getUser(user, res);
});

app.listen(8080, () => {
    console.log("Server listening on localhost:8080");
});
