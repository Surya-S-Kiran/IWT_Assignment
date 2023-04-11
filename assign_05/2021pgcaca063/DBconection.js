const mysql = require('mysql2');
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Surya',
    database: 'iwt'
});
exports.insertDB = function (user) {
    
}

module.exports = con;

