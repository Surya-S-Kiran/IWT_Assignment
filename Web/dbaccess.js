const mysql = require('mysql');

const conn = mysql.createConnection({
    host: "localhost",
    user: "mayukh",
    password: "Mayukh@23@sql",
    database: "web"
});

exports.insertDB = function(user) {
    conn.connect(function(err) {
        if(err) throw err;
        
        let sql = `insert into user values('${user.name}', '${user.password}', '${user.email}', '${user.contact}')`;
        conn.query(sql, function(err, result) {
            if(err) throw err;
            console.log('1 row updated');
        });
    });
}

exports.getUser = function(user, response) {
//    conn.connect(function(err) {
//        if(err) throw err;

        let sql = `select name from user where email='${user.email}' and passwd='${user.password}'`;
        conn.query(sql, function(err, result) {
            if(err) throw err;
            if(result.length == 1) {
                console.log(result);
                const obj = JSON.parse(JSON.stringify(result[0]));
                console.log(obj["name"]);
                response.cookie("email", user.email, {
                //    maxAge: 24*60*60*1000,
                //    expires: new Date(1,12,2023),
                    secure: true,
                    httpOnly: true,
                    sameSite: 'strict'
                });
                response.end("Welcome, " + obj["name"]);
            }
            else {
                response.clearCookie("email");
                response.end("Invalid username or password");   
            }
        });
//    });
};

exports.reloginUser = function(user, response) {
//    conn.connect(function(err) {
//        if(err) throw err;

        let sql = `select name from user where email='${user.email}'` ;
        conn.query(sql, function(err, result) {
            if(err) throw err;
            if(result.length == 1) {
                const obj = JSON.parse(JSON.stringify(result[0]));
            //    response.cookie("email", user.email);
                response.end("Welcome, " + obj["name"]);
            }
        });
//    });
};

exports.checkUser = function(user, response) {
    //    conn.connect(function(err) {
    //        if(err) throw err;
    
            let sql = `select name from user where email='${user.email}'` ;
            conn.query(sql, function(err, result) {
                if(err) throw err;
                if(result.length == 1) {
                    const obj = JSON.parse(JSON.stringify(result[0]));
                    response.end("Welcome, " + obj["name"]);
                }
                else
                    response.end("");
            });
    //    });
    };