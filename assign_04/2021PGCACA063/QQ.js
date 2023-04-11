const http = require('http');
const url = require('url');

const server = http.createServer((req,res) =>{
 
    const {pathname , query} = url.parse(req.url,true);

    if(pathname === '/age'){

        const dob = new Date(query.dob);
        const ageInMs = Date.now() - dob.getTime();
        const ageInYears = new Date(ageInMs).getFullYear() - 1970;

        res.writeHead(200, {'content-type':'text/html'});
        res.write(`<h1>Your age is ${ageInYears} years old</h1>`);
        res.end();
    }
    else
    {

    }

 server.listen(3000,() => {
    console.log()
 })
})