const http = require('http');
const fs = require('fs');
const url = require('url');

http.createServer((req, res) => {
    if(req.url == "/") {
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.readFile('dob.html', (err, data) => {
            res.end(data);
        });
    }
    else {
        let uparsed = url.parse(req.url);
        if(uparsed.pathname == '/age') {
            let params = uparsed.search.substring(
                uparsed.search.lastIndexOf('?')+1).split('&');
            
            let day, month, year;
            for(let p of params) {
                let ps = p.split('=');
                if(ps[0] == 'day')
                    day = parseInt(ps[1]);
                else if(ps[0] == 'month')
                    month = parseInt(ps[1]);
                else if(ps[0] == 'year')
                    year = parseInt(ps[1]);
            }

            console.log(day + " " + month + " " + year);
            res.write('Your age has been calculated');
            res.end();
        }
    }
}).listen(3000);