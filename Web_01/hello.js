const http = require('http');
const url = require('url');
const host = '127.0.0.1';
const port = 3000;

let server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    let q = url.parse(req.url);
    console.log(q.search);
    if(q.pathname == '/age') {
        let params = q.search.substring(q.search.lastIndexOf('?')+1).split('&');
        for(let p of params) {
            let pair = p.split('=');
            if(pair[0] == 'day')
                console.log(`Day: ${pair[1]}`);
            if(pair[0] == 'month')
                console.log(`Month: ${pair[1]}`);
        }
    }
    res.end();
});

server.listen(port, host, () => {
    console.log(`Server listening on http://${host}:${port}`);
});