const express = require('express')
const parser = require('cookie-parser')
const app = express();

const root = __dirname;

app.use(parser())

app.listen(8080,(err)=>{
        console.log("i am listenin");
})

app.get('/', (req, res) => {

        res.sendFile(root + '/index.html')

})

app.get('/loguser', (req, res) => {
        
        res.cookie('isLogged', 'true', {
                maxage : 5000
        })
        res.redirect('/')
})

app.get('/login', (req, res) => {

        let user = req.cookies.isLogged

        if(user == 'true'){
                res.send('uhh are logged in')
        }

        else{
                res.send('uhh are not authenticated')
        }
})